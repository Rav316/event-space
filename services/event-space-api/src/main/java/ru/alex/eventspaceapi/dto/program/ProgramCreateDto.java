package ru.alex.eventspaceapi.dto.program;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.List;

public record ProgramCreateDto(
        @NotNull
        @Size(min = 5, max = 128)
        String name,
        List<Integer> preferredCategoryIds
) {
}
