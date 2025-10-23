package ru.alex.eventspaceapi.dto.event;

public record EventStatisticsDto(
        Integer upcomingEventsCount,
        Integer finishedEventsCount
) {
}
