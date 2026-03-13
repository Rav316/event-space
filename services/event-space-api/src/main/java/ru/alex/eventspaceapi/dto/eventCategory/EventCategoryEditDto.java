package ru.alex.eventspaceapi.dto.eventCategory;

import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record EventCategoryEditDto(
        @Size(min = 3, max = 32)
        String name,

        @Pattern(regexp = "^#[0-9A-Fa-f]{6}$", message = "Color must be a valid hex color (e.g. #FF5733)")
        String color
) {
}
