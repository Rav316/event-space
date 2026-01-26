package ru.alex.eventspaceapi.dto.statistics;

public record EventAuthorStatisticsDto(
        Integer createdEvents,
        Integer totalParticipants
) {
}
