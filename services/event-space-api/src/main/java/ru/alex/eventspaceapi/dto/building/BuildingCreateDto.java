package ru.alex.eventspaceapi.dto.building;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record BuildingCreateDto(
        @NotNull
        @Size(min = 3)
        String name,
        @NotNull
        @Size(min = 10)
        String address
) {
}
