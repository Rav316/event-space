package ru.alex.eventspaceapi.dto.statistics;

public record UserProfileStatisticsDto(
        Integer createdEvents,
        Integer visitedEvents,
        Integer totalEvents,
        Integer upcomingEvents
) {
}
