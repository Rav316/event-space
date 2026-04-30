package ru.alex.eventspaceapi.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.alex.eventspaceapi.config.ReminderProperties;
import ru.alex.eventspaceapi.database.entity.Event;
import ru.alex.eventspaceapi.database.entity.EventReminder;
import ru.alex.eventspaceapi.database.entity.EventReminderStatus;
import ru.alex.eventspaceapi.database.entity.User;
import ru.alex.eventspaceapi.database.repository.EventReminderRepository;

import java.time.Instant;
import java.time.ZonedDateTime;

@Service
@RequiredArgsConstructor
@Slf4j
public class EventReminderService {

    private final EventReminderRepository repository;
    private final ReminderProperties properties;

    @Transactional
    public void scheduleFor(Event event, User user) {
        Instant sendAt = computeSendAt(event);
        if (sendAt == null) return;
        if (sendAt.isBefore(Instant.now())) {
            log.info("Skip reminder for event {} user {}: send_at already in the past", event.getId(), user.getId());
            return;
        }
        if (repository.existsByEventIdAndUserId(event.getId(), user.getId())) {
            log.debug("Reminder already exists for event {} user {}", event.getId(), user.getId());
            return;
        }
        EventReminder reminder = EventReminder.builder()
                .event(event)
                .user(user)
                .recipientEmail(user.getEmail())
                .sendAt(sendAt)
                .status(EventReminderStatus.PENDING)
                .attempts(0)
                .build();
        repository.save(reminder);
        log.info("Scheduled reminder for event {} user {} at {}", event.getId(), user.getId(), sendAt);
    }

    @Transactional
    public void cancelFor(Integer eventId, Integer userId) {
        int deleted = repository.deletePending(eventId, userId);
        if (deleted > 0) {
            log.info("Cancelled {} pending reminder(s) for event {} user {}", deleted, eventId, userId);
        }
    }

    @Transactional
    public void rescheduleFor(Event event) {
        Instant sendAt = computeSendAt(event);
        if (sendAt == null) {
            repository.deleteAllPendingByEvent(event.getId());
            return;
        }
        int updated = repository.rescheduleByEvent(event.getId(), sendAt);
        if (updated > 0) {
            log.info("Rescheduled {} pending reminder(s) for event {} to {}", updated, event.getId(), sendAt);
        }
    }

    @Transactional
    public void cancelAllFor(Integer eventId) {
        int deleted = repository.deleteAllPendingByEvent(eventId);
        if (deleted > 0) {
            log.info("Cancelled all {} pending reminder(s) for event {}", deleted, eventId);
        }
    }

    public Instant computeSendAt(Event event) {
        if (event == null || event.getEventDate() == null || event.getStartTime() == null) return null;
        return ZonedDateTime.of(event.getEventDate(), event.getStartTime(), properties.zone())
                .toInstant()
                .minus(properties.leadTime());
    }
}
