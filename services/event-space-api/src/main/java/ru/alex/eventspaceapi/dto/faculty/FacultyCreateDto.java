package ru.alex.eventspaceapi.dto.faculty;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record FacultyCreateDto(
        @NotNull
        @Size(min = 5, max = 128)
        String name,
        @NotNull
        Integer building
) {
}
