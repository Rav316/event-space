package ru.alex.eventspaceapi.dto.program;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record ProgramCreateDto(
        @NotNull
        @Size(min = 5, max = 128)
        String name,
        @NotNull
        Integer building
) {
}
