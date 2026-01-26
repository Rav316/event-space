package ru.alex.eventspaceapi.dto.user;

public record UserAuthorDto(
        Integer id,
        String firstName,
        String lastName,
        String avatarUrl
) {
}
