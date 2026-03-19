package ru.alex.eventspaceapi.dto.space;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record SpaceCreateDto(
        @NotNull
        @Size(min = 3, max = 64)
        String name,
        @NotNull
        Integer building,
        @NotNull
        Integer type,
        @Min(-1)
        Short floor,
        @NotNull
        @Min(1)
        Short capacity
) {
}
