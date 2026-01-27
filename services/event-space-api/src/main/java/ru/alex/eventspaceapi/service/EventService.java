package ru.alex.eventspaceapi.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import ru.alex.eventspaceapi.database.entity.*;
import ru.alex.eventspaceapi.database.repository.*;
import ru.alex.eventspaceapi.dto.event.EventCreateDto;
import ru.alex.eventspaceapi.dto.event.EventDetailsDto;
import ru.alex.eventspaceapi.dto.event.EventEditDto;
import ru.alex.eventspaceapi.dto.event.EventListDto;
import ru.alex.eventspaceapi.dto.event.EventListForUserDto;
import ru.alex.eventspaceapi.dto.event.EventListMyDto;
import ru.alex.eventspaceapi.dto.event.EventListPreviewDto;
import ru.alex.eventspaceapi.dto.event.EventReadDto;
import ru.alex.eventspaceapi.dto.eventStep.EventStepCreateDto;
import ru.alex.eventspaceapi.dto.filter.EventFilter;
import ru.alex.eventspaceapi.dto.filter.EventMyFilter;
import ru.alex.eventspaceapi.dto.filter.EventPreviewFilter;
import ru.alex.eventspaceapi.dto.user.UserDetailsDto;
import ru.alex.eventspaceapi.exception.EventCategoryNotFoundException;
import ru.alex.eventspaceapi.exception.EventNotFoundException;
import ru.alex.eventspaceapi.exception.SpaceNotFoundException;
import ru.alex.eventspaceapi.mapper.event.EventDetailsMapper;
import ru.alex.eventspaceapi.mapper.event.EventListForUserMapper;
import ru.alex.eventspaceapi.mapper.event.EventListMapper;
import ru.alex.eventspaceapi.mapper.event.EventListMyMapper;
import ru.alex.eventspaceapi.mapper.event.EventListPreviewMapper;
import ru.alex.eventspaceapi.mapper.event.EventReadMapper;
import ru.alex.eventspaceapi.mapper.eventStep.EventStepCreateMapper;
import ru.alex.eventspaceapi.messaging.EventCreatedMessage;
import ru.alex.eventspaceapi.messaging.EventNotificationPublisher;
import ru.alex.eventspaceapi.model.Role;

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
    private final EventListMyMapper eventListMyMapper;
    private final EventListPreviewMapper eventListPreviewMapper;
    private final EventReadMapper eventReadMapper;
    private final EventDetailsMapper eventDetailsMapper;
    private final EventListForUserMapper eventListForUserMapper;
    private final EventNotificationPublisher eventNotificationPublisher;

    public Page<EventListDto> findAllByFilter(EventFilter filter) {
        UserDetailsDto authorizedUser = getAuthorizedUser();
        return eventRepository.findAllEventsByFilter(authorizedUser != null ? authorizedUser.id() : null, filter)
                .map(eventListMapper::toDto);
    }

    public Page<EventListMyDto> findAllMyEvents(EventMyFilter filter) {
        return eventRepository.findAllEventsByUser(Objects.requireNonNull(getAuthorizedUser()).id(), filter)
                .map(eventListMyMapper::toDto);
    }

    public Slice<EventListPreviewDto> findAllByFilter(EventPreviewFilter filter) {
        return eventRepository.findAllEventsByFilter(filter)
                .map(eventListPreviewMapper::toDto);
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

    public List<String> findTagsStartWith(String prefix) {
        return eventRepository.findTagsStartWith(prefix);
    }

    public EventReadDto findById(Integer id) {
        return eventRepository.findByIdWithLoadedEntities(id)
                .map(eventReadMapper::toDto)
                .orElseThrow(() -> new EventNotFoundException(id));
    }

    public EventDetailsDto findByIdWithDetails(Integer id) {
        Event event = eventRepository.findByIdWithDetails(id)
                .orElseThrow(() -> new EventNotFoundException(id));
        List<EventStep> steps = eventStepRepository.findAllByEvent(event.getId());
        return eventDetailsMapper.toDto(event, steps);
    }

    @Transactional
    public void create(EventCreateDto dto, MultipartFile eventImage) {
        Event event = new Event();
        event.setName(dto.name());
        String[] tags = dto.tags() == null ? new String[]{} :
                dto.tags()
                .stream()
                .distinct()
                .toArray(String[]::new);
        event.setTags(tags);
        if(dto.eventDate().isBefore(LocalDate.now())) {
            throw new IllegalArgumentException("the event date cannot be earlier than the current one");
        }
        event.setEventDate(dto.eventDate());
        if(dto.endTime().isBefore(dto.startTime())) {
            throw new IllegalArgumentException("the end time of an event cannot be earlier than the start time of the event");
        }
        if(dto.eventDate().equals(LocalDate.now()) && dto.startTime().isBefore(LocalTime.now())) {
            throw new IllegalArgumentException("the start time of the event cannot be earlier than the current time on the day of the event");
        }
        event.setStartTime(dto.startTime());
        event.setEndTime(dto.endTime());
        event.setDeadline(dto.deadline());
        Space space = spaceRepository.findById(dto.space())
                .orElseThrow(() -> new SpaceNotFoundException(dto.space()));
        event.setSpace(space);
        event.setShortDescription(dto.shortDescription());
        event.setDescription(dto.description());
        UserDetailsDto authorizedUser = getAuthorizedUser();
        event.setAuthor(userRepository.getReferenceById(Objects.requireNonNull(authorizedUser).id()));

        EventCategory eventCategory = eventCategoryRepository.findById(dto.category())
                .orElseThrow(() -> new EventCategoryNotFoundException(dto.category()));
        event.setCategory(eventCategory);

        if(dto.participantQuantity() > space.getCapacity()) {
            throw new IllegalArgumentException("the number of participants cannot be greater than the capacity of the space");
        }
        event.setParticipantQuantity(dto.participantQuantity());

        validateEventSteps(dto.steps(), dto.startTime(), dto.endTime());

        if(eventImage != null && !eventImage.isEmpty()) {
            String imageUrl = fileService.saveFile(eventImage, "events");
            event.setImageUrl(imageUrl);
        }

        Event savedEvent = eventRepository.save(event);

        if(dto.steps() != null && !dto.steps().isEmpty()) {
            List<EventStep> eventSteps = dto.steps().stream()
                    .map(eventStepCreateMapper::toEntity)
                    .toList();

            eventSteps.forEach(step -> step.setEvent(savedEvent));

            eventStepRepository.insertEventStepsBatch(eventSteps);
        }

        List<String> recipients = userRepository.findEmailsWithNewEventNotifications();
        if(!recipients.isEmpty()) {
            EventCreatedMessage message = new EventCreatedMessage(
                    savedEvent.getId(),
                    savedEvent.getName(),
                    savedEvent.getEventDate(),
                    savedEvent.getStartTime(),
                    savedEvent.getEndTime(),
                    savedEvent.getShortDescription(),
                    savedEvent.getImageUrl(),
                    recipients
            );
            eventNotificationPublisher.publishEventCreated(message);
        }
    }

    @Transactional
    public void update(Integer id, EventEditDto dto, MultipartFile eventImage) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new EventNotFoundException(id));
        UserDetailsDto authorizedUser = Objects.requireNonNull(getAuthorizedUser());
        if(!event.getAuthor().getId().equals(authorizedUser.id()) && authorizedUser.role() != Role.ADMIN) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "you can not delete this event");
        }
        if(isEventStarted(event)) {
            throw new IllegalStateException("the event has already started, you cannot update this event");
        }
        if(isEventPassed(event)) {
            throw new IllegalStateException("the event has already passed, you cannot update this event");
        }

        if(dto.name() != null) {
            event.setName(dto.name());
        }

        if(dto.tags() != null && !dto.tags().isEmpty()) {
            String[] tags = dto.tags()
                    .stream()
                    .distinct()
                    .toArray(String[]::new);
            event.setTags(tags);
        }

        if(dto.eventDate() != null) {
            if(dto.eventDate().isBefore(LocalDate.now())) {
                throw new IllegalArgumentException("the event date cannot be earlier than the current one");
            }
            event.setEventDate(dto.eventDate());
        }
        if(dto.startTime() != null) {
            if(event.getEventDate().equals(LocalDate.now()) && dto.startTime().isBefore(LocalTime.now())) {
                throw new IllegalArgumentException("the start time of the event cannot be earlier than the current time on the day of the event");
            }
            event.setStartTime(dto.startTime());
        }
        if(dto.endTime() != null) {
            if(dto.endTime().isBefore(event.getStartTime())) {
                throw new IllegalArgumentException("the end time of an event cannot be earlier than the start time of the event");
            }
            event.setEndTime(dto.endTime());
        }
        if(dto.deadline() != null) {
            event.setDeadline(dto.deadline());
        }
        if(dto.space() != null) {
            Space space = spaceRepository.findById(dto.space())
                    .orElseThrow(() -> new SpaceNotFoundException(dto.space()));
            event.setSpace(space);
        }
        if(dto.shortDescription() != null) {
            event.setShortDescription(dto.shortDescription());
        }
        if(dto.description() != null) {
            event.setDescription(dto.description());
        }
        if(dto.category() != null) {
            EventCategory eventCategory = eventCategoryRepository.findById(dto.category())
                    .orElseThrow(() -> new EventCategoryNotFoundException(dto.category()));
            event.setCategory(eventCategory);
        }
        if(dto.participantQuantity() != null) {
            if(dto.participantQuantity() > event.getSpace().getCapacity()) {
                throw new IllegalArgumentException("the number of participants cannot be greater than the capacity of the space");
            }
            event.setParticipantQuantity(dto.participantQuantity());
        }

        validateEventSteps(dto.steps(), dto.startTime(), dto.endTime());

        if(eventImage != null) {
            if(event.getImageUrl() != null) {
                fileService.deleteFileByUrl(event.getImageUrl());
            }
            if(!eventImage.isEmpty()) {
                String imageUrl = fileService.saveFile(eventImage, "events");
                event.setImageUrl(imageUrl);
            } else {
                event.setImageUrl(null);
            }
        }

        Event savedEvent = eventRepository.save(event);

        if(dto.steps() != null && !dto.steps().isEmpty()) {
            List<EventStep> eventSteps = dto.steps().stream()
                    .map(eventStepCreateMapper::toEntity)
                    .toList();
            eventSteps.forEach(step -> step.setEvent(savedEvent));
            eventStepRepository.deleteByEvent(event.getId());
            eventStepRepository.insertEventStepsBatch(eventSteps);
        }

    }

    @Transactional
    public void delete(Integer id) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new EventNotFoundException(id));
        UserDetailsDto authorizedUser = Objects.requireNonNull(getAuthorizedUser());
        if(!event.getAuthor().getId().equals(authorizedUser.id()) && authorizedUser.role() != Role.ADMIN) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "you can not delete this event");
        }
        if(isEventStarted(event) && !isEventPassed(event)) {
            throw new IllegalStateException("You can't delete an event until it's finished.");
        }
        eventRepository.delete(event);
    }

    private void validateEventSteps(List<EventStepCreateDto> steps, LocalTime startTime, LocalTime endTime) {
        if(steps == null) return;
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
            if (step.startTime().isBefore(startTime) || step.endTime().isAfter(endTime)) {
                throw new IllegalArgumentException(
                        String.format("Step %d: step is outside the event time boundaries (%s - %s)",
                                i + 1, startTime, endTime)
                );
            }
        }
    }

    private boolean isEventPassed(Event event) {
        LocalDate now = LocalDate.now();
        return event.getEventDate().isBefore(now) ||
                (event.getEventDate().isEqual(now) && event.getEndTime().isBefore(LocalTime.now()));
    }

    private boolean isEventStarted(Event event) {
        LocalDate now = LocalDate.now();
        return (event.getEventDate().isEqual(now) && event.getStartTime().isBefore(LocalTime.now()));
    }
}
