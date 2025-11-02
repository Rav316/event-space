package ru.alex.eventspaceapi.dto.eventUser;

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
