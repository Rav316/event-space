package ru.alex.eventspaceapi.dto.eventCategory;

import jakarta.validation.constraints.Size;

public record EventCategoryEditDto(
        @Size(min = 3, max = 32)
        String name
) {
}
