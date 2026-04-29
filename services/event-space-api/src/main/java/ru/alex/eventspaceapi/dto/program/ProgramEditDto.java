package ru.alex.eventspaceapi.dto.program;

import jakarta.validation.constraints.Size;

public record ProgramEditDto(
        @Size(min = 5, max = 128)
        String name,
        Integer building
) {
}
