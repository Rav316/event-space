package ru.alex.eventspaceapi.dto.eventReview;

import ru.alex.eventspaceapi.dto.user.UserAuthorDto;

import java.time.Instant;

public record EventReviewReadDto (
        Integer id,
        UserAuthorDto author,
        Integer event,
        String title,
        String content,
        Short rating,
        Integer helpfulMarks,
        Boolean userMarkedHelpful,
        Instant createdAt
) {
}
