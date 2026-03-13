package ru.alex.eventspaceapi.dto.eventCategory;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record EventCategoryCreateDto(
        @NotNull
        @Size(min = 3, max = 32)
        String name
) {
}
