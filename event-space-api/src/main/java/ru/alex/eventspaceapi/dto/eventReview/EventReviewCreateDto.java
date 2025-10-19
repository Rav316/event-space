package ru.alex.eventspaceapi.dto.eventReview;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record EventReviewCreateDto(
        @NotNull
        @Min(1)
        @Max(5)
        Short rating,

        @NotNull
        @Size(min = 5, max = 100)
        String title,

        @NotNull
        @Size(min = 10, max = 1000)
        String content
) {
}
