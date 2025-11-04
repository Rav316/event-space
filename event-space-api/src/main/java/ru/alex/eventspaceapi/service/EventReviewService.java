package ru.alex.eventspaceapi.service;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.CacheManager;
import org.springframework.data.domain.Slice;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import ru.alex.eventspaceapi.database.entity.Event;
import ru.alex.eventspaceapi.database.entity.EventReview;
import ru.alex.eventspaceapi.database.entity.EventUser;
import ru.alex.eventspaceapi.database.repository.EventRepository;
import ru.alex.eventspaceapi.database.repository.EventReviewRepository;
import ru.alex.eventspaceapi.database.repository.EventUserRepository;
import ru.alex.eventspaceapi.database.repository.UserRepository;
import ru.alex.eventspaceapi.dto.eventReview.EventReviewCreateEditDto;
import ru.alex.eventspaceapi.dto.eventReview.EventReviewMyDto;
import ru.alex.eventspaceapi.dto.eventReview.EventReviewReadDto;
import ru.alex.eventspaceapi.dto.eventReview.EventReviewStatisticsDto;
import ru.alex.eventspaceapi.dto.filter.EventReviewFilter;
import ru.alex.eventspaceapi.exception.EventNotFoundException;
import ru.alex.eventspaceapi.mapper.eventReview.EventReviewCreateMapper;
import ru.alex.eventspaceapi.mapper.eventReview.EventReviewEditMapper;
import ru.alex.eventspaceapi.mapper.eventReview.EventReviewMyMapper;
import ru.alex.eventspaceapi.mapper.eventReview.EventReviewReadMapper;

import java.time.Instant;
import java.util.Objects;

import static ru.alex.eventspaceapi.util.AuthUtils.getAuthorizedUser;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class EventReviewService {
    private final CacheManager cacheManager;
    private final UserRepository userRepository;
    private final EventRepository eventRepository;
    private final EventUserRepository eventUserRepository;
    private final EventReviewRepository eventReviewRepository;
    private final EventReviewReadMapper eventReviewReadMapper;
    private final EventReviewMyMapper eventReviewMyMapper;
    private final EventReviewCreateMapper eventReviewCreateMapper;
    private final EventReviewEditMapper eventReviewEditMapper;

    public Slice<EventReviewReadDto> findAllReviewsByEvent(Integer eventId, EventReviewFilter filter) {
        return eventReviewRepository.findAllByEventWithFilter(eventId, filter)
                .map(eventReviewReadMapper::toDto);
    }

    public EventReviewStatisticsDto getEventReviewsStatistics(Integer eventId) {
        return eventReviewRepository.getEventReviewStatistics(eventId);
    }

    public EventReviewMyDto getUserReviewByEvent(Integer eventId) {
        return eventReviewRepository.findByEventAndUser(eventId, Objects.requireNonNull(getAuthorizedUser()).id())
                .map(eventReviewMyMapper::toDto)
                .orElse(null);
    }

    @Transactional
    public EventReviewReadDto addReviewForEvent(Integer eventId, EventReviewCreateEditDto eventReviewCreateDto) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new EventNotFoundException(eventId));
        Integer authorizedUserId = Objects.requireNonNull(getAuthorizedUser()).id();
        EventUser eventUser = eventUserRepository.findByEventAndUser(event.getId(), authorizedUserId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.FORBIDDEN, "you are not registered for this event"));
        if(!eventUser.getAttended()) {
            throw new IllegalStateException("you cannot leave a review for an event without confirming your attendance");
        }
        if(eventReviewRepository.existsByEventAndUser(event.getId(), authorizedUserId)) {
            throw new IllegalStateException("you already have a review for this event");
        }
        EventReview review = eventReviewCreateMapper.toEntity(eventReviewCreateDto);
        review.setEvent(event);
        review.setAuthor(userRepository.getReferenceById(authorizedUserId));
        review.setCreatedAt(Instant.now());
        EventReview savedReview = eventReviewRepository.save(review);
        Objects.requireNonNull(cacheManager.getCache("overviewStats")).evict(authorizedUserId);
        return eventReviewReadMapper.toDto(savedReview);
    }

    @Transactional
    public void updateReviewByEvent(Integer eventId, EventReviewCreateEditDto eventReviewCreateEditDto) {
        Integer authorizedUserId = Objects.requireNonNull(getAuthorizedUser()).id();
        EventReview eventReview = eventReviewRepository.findByEventAndUser(eventId, authorizedUserId)
                .orElseThrow(() -> new EntityNotFoundException("there are no events or reviews of events"));
        eventReviewEditMapper.updateFromEntity(eventReviewCreateEditDto, eventReview);
        Objects.requireNonNull(cacheManager.getCache("overviewStats")).evict(authorizedUserId);
    }

    @Transactional
    public void deleteReviewByEvent(Integer eventId) {
        Integer authorizedUserId = Objects.requireNonNull(getAuthorizedUser()).id();
        eventReviewRepository.deleteByEventAndUser(eventId, authorizedUserId);
        Objects.requireNonNull(cacheManager.getCache("overviewStats")).evict(authorizedUserId);
    }
}
