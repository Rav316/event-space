package ru.alex.eventspaceapi.dto.eventReview;

public record EventReviewStatisticsDto(
        Float avgRating,
        Integer fiveStars,
        Integer fourStars,
        Integer threeStars,
        Integer twoStars,
        Integer oneStar,
        Integer total
) {
}
