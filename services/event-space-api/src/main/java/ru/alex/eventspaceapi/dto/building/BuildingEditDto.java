package ru.alex.eventspaceapi.dto.building;

import jakarta.validation.constraints.Size;

public record BuildingEditDto(
        @Size(min = 3)
        String name,
        @Size(min = 10)
        String address
) {
}
