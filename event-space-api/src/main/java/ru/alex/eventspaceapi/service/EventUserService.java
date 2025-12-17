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
import ru.alex.eventspaceapi.dto.event.EventQrInfoDto;
import ru.alex.eventspaceapi.exception.EventNotFoundException;
import ru.alex.eventspaceapi.exception.QrConfirmationException;
import ru.alex.eventspaceapi.mapper.event.EventQrInfoMapper;
import ru.alex.eventspaceapi.model.QrConfirmErrorCode;

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
    private final EventQrInfoMapper eventQrInfoMapper;


    @Transactional
    public void registerForEvent(Integer id) {
        Event event = eventRepository.findByIdForUpdate(id)
                .orElseThrow(() -> new EventNotFoundException(id));
        if(isEventStarted(event)) {
            throw new IllegalStateException("the event has already started, you cannot register on it");
        }

        if (event.getDeadline() != null && event.getDeadline().isBefore(LocalDate.now())) {
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
    public EventQrInfoDto confirmParticipantAttendance(String token) {
        if (!isValidUUID(token)) {
            throw new QrConfirmationException(
                    QrConfirmErrorCode.INVALID_TOKEN,
                    "QR token has invalid format"
            );
        }
        EventUser eventUser = eventUserRepository
                .findByQrTokenWithEvent(UUID.fromString(token))
                .orElseThrow(() -> new QrConfirmationException(
                        QrConfirmErrorCode.TOKEN_NOT_FOUND,
                        "No information found for this QR token"
                ));
        Event event = eventUser.getEvent();
        ZonedDateTime eventStart = ZonedDateTime.of(event.getEventDate(), event.getStartTime(), ZoneId.systemDefault());
        ZonedDateTime eventEnd = ZonedDateTime.of(event.getEventDate(), event.getStartTime(), ZoneId.systemDefault());
        Instant now = Instant.now();

        if (now.isBefore(eventStart.minusHours(24).toInstant())) {
            throw new QrConfirmationException(
                    QrConfirmErrorCode.TOO_EARLY,
                    "Confirmation is available only 24 hours before event"
            );
        }

        if (now.isAfter(eventEnd.toInstant())) {
            throw new QrConfirmationException(
                    QrConfirmErrorCode.EVENT_ENDED,
                    "Event has already ended"
            );
        }

        if (eventUser.getAttended()) {
            throw new QrConfirmationException(
                    QrConfirmErrorCode.ALREADY_SCANNED,
                    "QR code already scanned"
            );
        }

        eventUser.setAttended(true);
        eventUser.setConfirmedBy(userRepository.getReferenceById(Objects.requireNonNull(getAuthorizedUser()).id()));
        eventUser.setConfirmedAt(Instant.now());

        return eventQrInfoMapper.toDto(event);
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
