package ru.alex.eventspaceapi.dto.building;

public record BuildingDeleteImpactDto(
        long programs,
        long users,
        long spaces,
        long events
) {
}
