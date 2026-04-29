package ru.alex.eventspaceapi.dto.user;

public record UserEventAuthorDto(
        Integer id,
        String firstName,
        String lastName,
        String program,
        String avatarUrl
) {
}
