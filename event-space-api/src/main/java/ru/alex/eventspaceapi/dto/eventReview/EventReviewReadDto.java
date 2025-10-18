package ru.alex.eventspaceapi.dto.eventReview;

import ru.alex.eventspaceapi.dto.user.UserAuthorDto;

import java.time.Instant;

public record EventReviewReadDto (
        UserAuthorDto author,
        Integer event,
        String title,
        String content,
        Short rating,
        Instant createdAt
) {
}
