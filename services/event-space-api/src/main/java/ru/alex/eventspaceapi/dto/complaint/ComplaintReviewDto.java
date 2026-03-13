package ru.alex.eventspaceapi.dto.complaint;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record ComplaintReviewDto(
        @Size(max = 500)
        String comment,
        @NotNull
        Boolean resolved
) {
}
