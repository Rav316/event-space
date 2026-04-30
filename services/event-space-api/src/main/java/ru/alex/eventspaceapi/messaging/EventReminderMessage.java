package ru.alex.eventspaceapi.messaging;

import java.time.LocalDate;
import java.time.LocalTime;

public record EventReminderMessage(
        Integer eventId,
        String name,
        LocalDate eventDate,
        LocalTime startTime,
        LocalTime endTime,
        String shortDescription,
        String recipientEmail
) {
}
