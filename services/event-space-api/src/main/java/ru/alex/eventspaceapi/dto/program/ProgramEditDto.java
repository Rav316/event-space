package ru.alex.eventspaceapi.dto.program;

import jakarta.validation.constraints.Size;

import java.util.List;

public record ProgramEditDto(
        @Size(min = 5, max = 128)
        String name,
        List<Integer> preferredCategoryIds
) {
}
