package ru.alex.eventspaceapi.dto.faculty;

import jakarta.validation.constraints.Size;

public record FacultyEditDto(
        @Size(min = 5, max = 128)
        String name,
        Integer building
) {
}
