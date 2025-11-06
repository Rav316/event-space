package ru.alex.eventspaceapi.dto.eventReview;

import java.time.Instant;

public record EventReviewMyDto(
        Integer id,
        Integer event,
        String title,
        String content,
        Short rating,
        Integer helpfulMarks,
        Boolean userMarkedHelpful,
        Instant createdAt
) {
}
