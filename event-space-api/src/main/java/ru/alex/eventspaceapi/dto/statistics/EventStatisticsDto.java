package ru.alex.eventspaceapi.dto.statistics;

public record EventStatisticsDto(
        Integer upcomingEventsCount,
        Integer finishedEventsCount
) {
}
