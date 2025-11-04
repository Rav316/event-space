package ru.alex.eventspaceapi.dto.statistics;

import java.util.List;

public record OverviewStatisticsDto(
        List<MonthEventStatisticsDto> monthEventStatistics,
        List<DayOfWeekStatisticsDto> dayOfWeekStatistics,
        Integer attendedEventsLastMonth,
        Double avgAttendedEventsPerUserLastMonth,
        Integer reviewsLastMonth,
        Double avgReviewsPerUserLastMonth,
        Double avgRating,
        Double avgRatingSystem
) {
    public record MonthEventStatisticsDto(
            Integer month,
            Integer confirmedEventsCount
    ) {}

    public record DayOfWeekStatisticsDto(
            Integer dayOfWeek,
            Integer attendedEventsCount
    ) {}
}
