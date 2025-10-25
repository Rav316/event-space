package ru.alex.eventspaceapi.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import ru.alex.eventspaceapi.database.entity.*;
import ru.alex.eventspaceapi.database.repository.*;
import ru.alex.eventspaceapi.dto.event.EventCreateDto;
import ru.alex.eventspaceapi.dto.event.EventListDto;
import ru.alex.eventspaceapi.dto.event.EventListForUserDto;
import ru.alex.eventspaceapi.dto.event.EventReadDto;
import ru.alex.eventspaceapi.dto.event.EventStatisticsDto;
import ru.alex.eventspaceapi.dto.eventStep.EventStepCreateDto;
import ru.alex.eventspaceapi.dto.filter.EventFilter;
import ru.alex.eventspaceapi.dto.user.UserDetailsDto;
import ru.alex.eventspaceapi.exception.EventCategoryNotFoundException;
import ru.alex.eventspaceapi.exception.EventNotFoundException;
import ru.alex.eventspaceapi.exception.SpaceNotFoundException;
import ru.alex.eventspaceapi.mapper.event.EventListForUserMapper;
import ru.alex.eventspaceapi.mapper.event.EventListMapper;
import ru.alex.eventspaceapi.mapper.event.EventReadMapper;
import ru.alex.eventspaceapi.mapper.eventStep.EventStepCreateMapper;

import java.time.*;
import java.util.List;
import java.util.Objects;

import static ru.alex.eventspaceapi.util.AuthUtils.getAuthorizedUser;


@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class EventService {
    private final static Integer USER_EVENTS_PAGE_SIZE = 20;
    private final FileService fileService;
    private final UserRepository userRepository;
    private final EventRepository eventRepository;
    private final EventStepRepository eventStepRepository;
    private final SpaceRepository spaceRepository;
    private final EventCategoryRepository eventCategoryRepository;
    private final EventUserRepository eventUserRepository;
    private final EventStepCreateMapper eventStepCreateMapper;
    private final EventListMapper eventListMapper;
    private final EventReadMapper eventReadMapper;
    private final EventListForUserMapper eventListForUserMapper;

    public Page<EventListDto> findAllByFilter(EventFilter filter) {
        UserDetailsDto authorizedUser = getAuthorizedUser();
        return eventRepository.findAllEventsByFilter(authorizedUser != null ? authorizedUser.id() : null, filter)
                .map(eventListMapper::toDto);
    }

    public List<EventListDto> getActualEvents() {
        return eventRepository.getActualEvents(PageRequest.of(0, 6))
                .stream()
                .map(eventListMapper::toDto)
                .toList();
    }

    public Slice<EventListForUserDto> getUpcomingEventsForUser(Integer page) {
        return eventUserRepository.findAllUpcomingByUserWithLoadedEntities(
                Objects.requireNonNull(getAuthorizedUser()).id(),
                        PageRequest.of(page, USER_EVENTS_PAGE_SIZE)
                ).map(eventListForUserMapper::toDto);
    }

    public Slice<EventListForUserDto> getFinishedEventsForUser(Integer page) {
        return eventUserRepository.findAllFinishedByUserWithLoadedEntities(
                Objects.requireNonNull(getAuthorizedUser()).id(),
                PageRequest.of(page, USER_EVENTS_PAGE_SIZE)
        ).map(eventListForUserMapper::toDto);
    }

    public EventStatisticsDto getUserEventsStatistics() {
        return eventUserRepository.getUserEventStatistics(Objects.requireNonNull(getAuthorizedUser()).id());
    }

    public List<String> findTagsStartWith(String prefix) {
        return eventRepository.findTagsStartWith(prefix);
    }

    public EventReadDto findById(Integer id) {
        return eventRepository.findByIdWithLoadedEntities(id)
                .map(eventReadMapper::toDto)
                .orElseThrow(() -> new EventNotFoundException(id));
    }

    @Transactional
    public void create(EventCreateDto eventCreateDto, MultipartFile eventImage) {
        Event event = new Event();
        event.setName(eventCreateDto.name());
        String[] tags = eventCreateDto.tags() == null ? new String[]{} :
                eventCreateDto.tags()
                .stream()
                .distinct()
                .toArray(String[]::new);
        event.setTags(tags);
        if(eventCreateDto.eventDate().isBefore(LocalDate.now())) {
            throw new IllegalArgumentException("the event date cannot be earlier than the current one");
        }
        event.setEventDate(eventCreateDto.eventDate());
        if(eventCreateDto.endTime().isBefore(eventCreateDto.startTime())) {
            throw new IllegalArgumentException("the end time of an event cannot be earlier than the start time of the event");
        }
        if(eventCreateDto.eventDate().equals(LocalDate.now()) && eventCreateDto.startTime().isBefore(LocalTime.now())) {
            throw new IllegalArgumentException("the start time of the event cannot be earlier than the current time on the day of the event");
        }
        event.setStartTime(eventCreateDto.startTime());
        event.setEndTime(eventCreateDto.endTime());
        event.setDeadline(eventCreateDto.deadline());
        Space space = spaceRepository.findById(eventCreateDto.space())
                .orElseThrow(() -> new SpaceNotFoundException(eventCreateDto.space()));
        event.setSpace(space);
        event.setShortDescription(eventCreateDto.shortDescription());
        event.setDescription(eventCreateDto.description());
        UserDetailsDto authorizedUser = getAuthorizedUser();
        event.setAuthor(userRepository.getReferenceById(Objects.requireNonNull(authorizedUser).id()));

        EventCategory eventCategory = eventCategoryRepository.findById(eventCreateDto.category())
                .orElseThrow(() -> new EventCategoryNotFoundException(eventCreateDto.category()));
        event.setCategory(eventCategory);

        validateEventSteps(eventCreateDto);

        if(eventImage != null && !eventImage.isEmpty()) {
            String imageUrl = fileService.saveFile(eventImage, "events");
            event.setImageUrl(imageUrl);
        }

        Event savedEvent = eventRepository.save(event);

        if(eventCreateDto.steps() != null && !eventCreateDto.steps().isEmpty()) {
            List<EventStep> eventSteps = eventCreateDto.steps().stream()
                    .map(eventStepCreateMapper::toEntity)
                    .toList();

            eventSteps.forEach(step -> step.setEvent(savedEvent));

            eventStepRepository.insertEventStepsBatch(eventSteps);
        }
    }

    private void validateEventSteps(EventCreateDto event) {
        List<EventStepCreateDto> steps = event.steps();

        for (int i = 0; i < steps.size(); i++) {
            EventStepCreateDto step = steps.get(i);

            // 1) End time must be after start time
            if (!step.startTime().isBefore(step.endTime())) {
                throw new IllegalArgumentException(
                        String.format("Step %d: startTime (%s) must be before endTime (%s)",
                                i + 1, step.startTime(), step.endTime())
                );
            }

            // 2) Steps must be sequential
            if (i > 0) {
                EventStepCreateDto prevStep = steps.get(i - 1);
                if (!prevStep.endTime().equals(step.startTime())) {
                    throw new IllegalArgumentException(
                            String.format("Step %d: must start exactly after the previous step ends (%s)",
                                    i + 1, prevStep.endTime())
                    );
                }
            }

            // 3) Steps must fit within event time
            if (step.startTime().isBefore(event.startTime()) || step.endTime().isAfter(event.endTime())) {
                throw new IllegalArgumentException(
                        String.format("Step %d: step is outside the event time boundaries (%s - %s)",
                                i + 1, event.startTime(), event.endTime())
                );
            }
        }
    }
}
