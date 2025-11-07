package ru.alex.eventspaceapi.dto.eventReview;

import ru.alex.eventspaceapi.dto.eventCategory.EventCategoryReadDto;

import java.time.Instant;
import java.time.LocalDate;

public record EventReviewListDto(
        Integer eventId,
        String eventName,
        EventCategoryReadDto eventCategory,
        LocalDate eventDate,
        Integer participantQuantity,
        Short rating,
        String content,
        Instant createdAt
) {
}
