package ru.alex.emailnotificationservice.messaging;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public record EventCreatedMessage(
        Integer eventId,
        String name,
        LocalDate eventDate,
        LocalTime startTime,
        LocalTime endTime,
        String shortDescription,
        String imageUrl,
        List<String> recipients
) {
}
