package ru.alex.eventspaceapi.dto.statistics;

public record UserStatisticsDto(
        Integer totalEvents,
        Integer reviewsLeft,
        Double avgAttendance,
        Double avgReviewRating,
        Integer monthlyEventsDelta,
        Integer monthlyReviewsDelta,
        Double monthlyAttendanceDelta,
        Double avgRatingDelta
) {
}
