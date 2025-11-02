package ru.alex.eventspaceapi.dto.eventUser;

public record EventStatisticsDto(
        Integer upcomingEventsCount,
        Integer finishedEventsCount
) {
}
