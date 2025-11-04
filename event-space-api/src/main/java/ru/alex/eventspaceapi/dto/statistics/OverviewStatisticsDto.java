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
        Double avgRatingSystem,
        List<ReviewsDynamicStatisticsDto> reviewsDynamicStatistics,
        List<ReviewsAvgRatingStatisticsDto> reviewsAvgRatingStatistics
) {
    public record MonthEventStatisticsDto(
            Integer month,
            Integer confirmedEventsCount
    ) {}

    public record DayOfWeekStatisticsDto(
            Integer dayOfWeek,
            Integer attendedEventsCount
    ) {}

    public record ReviewsDynamicStatisticsDto(
            Integer month,
            Integer reviewsCount
    ) {}

    public record ReviewsAvgRatingStatisticsDto(
            Integer month,
            Double rating
    ) {}
}
