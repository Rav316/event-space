package ru.alex.eventspaceapi.dto.filter;

import jakarta.validation.constraints.NotNull;

public record SpaceFilter(
        @NotNull
        Integer building,
        String name,
        Integer type,
        Short minCapacity,
        Short maxCapacity
) {
}
