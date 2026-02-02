package ru.alex.eventspaceapi.dto.user;

public record TopOrganizerDto(
        Integer id,
        String firstName,
        String lastName,
        String avatarUrl,
        Long eventsCount
) {
}
