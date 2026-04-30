package ru.alex.eventspaceapi.scheduler;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import ru.alex.eventspaceapi.config.ReminderProperties;
import ru.alex.eventspaceapi.database.entity.Event;
import ru.alex.eventspaceapi.database.entity.EventReminder;
import ru.alex.eventspaceapi.database.entity.EventReminderStatus;
import ru.alex.eventspaceapi.database.entity.User;
import ru.alex.eventspaceapi.database.repository.EventReminderRepository;
import ru.alex.eventspaceapi.messaging.EventNotificationPublisher;
import ru.alex.eventspaceapi.messaging.EventReminderMessage;

import java.time.Instant;
import java.time.ZonedDateTime;
import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class EventReminderDispatcher {

    private final EventReminderRepository repository;
    private final EventNotificationPublisher publisher;
    private final ReminderProperties properties;

    @Scheduled(fixedDelayString = "${app.reminder.poll-ms:60000}")
    @Transactional
    public void tick() {
        List<EventReminder> due = repository.claimDue(
                Instant.now(),
                properties.batchSize()
        );
        if (due.isEmpty()) return;
        log.debug("Processing {} due reminder(s)", due.size());
        Instant now = Instant.now();
        for (EventReminder reminder : due) {
            try {
                process(reminder, now);
            } catch (Exception e) {
                log.error("Reminder {} processing failed: {}", reminder.getId(), e.getMessage(), e);
                reminder.setAttempts(reminder.getAttempts() + 1);
                reminder.setLastError(truncate(e.getMessage()));
                if (reminder.getAttempts() >= properties.maxAttempts()) {
                    reminder.setStatus(EventReminderStatus.FAILED);
                }
            }
        }
    }

    private void process(EventReminder reminder, Instant now) {
        Event event = reminder.getEvent();
        if (event == null) {
            reminder.setStatus(EventReminderStatus.CANCELLED);
            reminder.setLastError("event no longer exists");
            return;
        }
        if (hasEventStarted(event, now)) {
            reminder.setStatus(EventReminderStatus.CANCELLED);
            reminder.setLastError("event already started");
            return;
        }
        User user = reminder.getUser();
        if (!shouldSend(event, user)) {
            reminder.setStatus(EventReminderStatus.CANCELLED);
            reminder.setLastError("notifications disabled or category off");
            return;
        }
        EventReminderMessage message = new EventReminderMessage(
                event.getId(),
                event.getName(),
                event.getEventDate(),
                event.getStartTime(),
                event.getEndTime(),
                event.getShortDescription(),
                user.getEmail()
        );
        publisher.publishEventReminder(message);
        reminder.setStatus(EventReminderStatus.SENT);
        reminder.setSentAt(now);
        log.info("Reminder {} sent for event {} to {}", reminder.getId(), event.getId(), user.getEmail());
    }

    private boolean shouldSend(Event event, User user) {
        if (user == null || !user.isActive() || !user.isEmailNotificationsEnabled()) return false;
        if (event.getCategory() == null || user.getNotificationCategories() == null) return false;
        Integer categoryId = event.getCategory().getId();
        return user.getNotificationCategories().stream()
                .anyMatch(c -> categoryId.equals(c.getId()));
    }

    private boolean hasEventStarted(Event event, Instant now) {
        if (event.getEventDate() == null || event.getStartTime() == null) return false;
        Instant eventStart = ZonedDateTime
                .of(event.getEventDate(), event.getStartTime(), properties.zone())
                .toInstant();
        return !now.isBefore(eventStart);
    }

    private String truncate(String s) {
        if (s == null) return null;
        return s.length() > 1000 ? s.substring(0, 1000) : s;
    }
}
