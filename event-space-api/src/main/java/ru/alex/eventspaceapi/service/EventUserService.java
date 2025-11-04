package ru.alex.eventspaceapi.service;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import ru.alex.eventspaceapi.database.entity.Event;
import ru.alex.eventspaceapi.database.entity.EventUser;
import ru.alex.eventspaceapi.database.repository.EventRepository;
import ru.alex.eventspaceapi.database.repository.EventUserRepository;
import ru.alex.eventspaceapi.database.repository.UserRepository;
import ru.alex.eventspaceapi.exception.EventNotFoundException;

import java.time.*;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

import static ru.alex.eventspaceapi.util.AuthUtils.getAuthorizedUser;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class EventUserService {
    private final EventRepository eventRepository;
    private final EventUserRepository eventUserRepository;
    private final UserRepository userRepository;

    @Transactional
    public void registerForEvent(Integer id) {
        Event event = eventRepository.findByIdForUpdate(id)
                .orElseThrow(() -> new EventNotFoundException(id));
        if(isEventStarted(event)) {
            throw new IllegalStateException("the event has already started, you cannot register on it");
        }

        if (event.getDeadline() != null && event.getDeadline().isAfter(LocalDate.now())) {
            throw new IllegalStateException("the registration deadline for the events has expired");
        }


        List<EventUser> eventUsers = eventUserRepository.findAllByEvent(event.getId());
        Integer authorizedUserId = Objects.requireNonNull(getAuthorizedUser()).id();

        if (eventUsers.stream().anyMatch(eu -> eu.getEvent().getId().equals(authorizedUserId))) {
            throw new IllegalStateException("you are already registered for this event");
        }

        if (eventUsers.size() >= event.getSpace().getCapacity()) {
            throw new IllegalStateException("unable to register for events: no seats available");
        }

        EventUser eventUser = EventUser.builder()
                .event(event)
                .user(userRepository.getReferenceById(authorizedUserId))
                .qrToken(UUID.randomUUID())
                .registeredAt(Instant.now())
                .build();
        eventUserRepository.save(eventUser);
    }

    @Transactional
    public void unregisterFromEvent(Integer id) {
        Event event = eventRepository.findByIdForUpdate(id)
                .orElseThrow(() -> new EventNotFoundException(id));
        if(isEventPassed(event)) {
            throw new IllegalStateException("the event has already passed, you cannot cancel your registration");
        }
        EventUser eventUser = eventUserRepository.findByEventAndUser(event.getId(), Objects.requireNonNull(getAuthorizedUser()).id())
                .orElseThrow(() -> new EntityNotFoundException("unable to cancel registration: you are not registered for event 1"));
        if(eventUser.getAttended()) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "you cannot cancel your registration after your attendance has been marked");
        }
        eventUserRepository.deleteById(eventUser.getId());
    }

    @Transactional
    public void confirmParticipantAttendance(Integer id, String token) {
        if(!isValidUUID(token)) {
            throw new IllegalArgumentException("token is not valid");
        }
        EventUser eventUser = eventUserRepository.findByQrTokenWithEvent(UUID.fromString(token))
                .orElseThrow(() -> new EntityNotFoundException("no information found with the passed token"));
        Event event = eventUser.getEvent();
        if(!event.getId().equals(id)) {
            throw new IllegalArgumentException("inappropriate token for this event");
        }
        ZonedDateTime eventStart = ZonedDateTime.of(event.getEventDate(), event.getStartTime(), ZoneId.systemDefault());
        ZonedDateTime eventEnd = ZonedDateTime.of(event.getEventDate(), event.getStartTime(), ZoneId.systemDefault());
        Instant now = Instant.now();

        if (now.isBefore(eventStart.minusHours(24).toInstant())) {
            throw new IllegalStateException("confirmation is only available 24 hours before the event");
        }

        if (now.isAfter(eventEnd.toInstant())) {
            throw new IllegalStateException("It is not possible to confirm participation in an event that has already ended");
        }

        eventUser.setAttended(true);
        eventUser.setConfirmedBy(userRepository.getReferenceById(Objects.requireNonNull(getAuthorizedUser()).id()));
        eventUser.setConfirmedAt(Instant.now());
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

    private boolean isValidUUID(String token) {
        try {
            UUID.fromString(token);
            return true;
        } catch (IllegalArgumentException e) {
            return false;
        }
    }
}
