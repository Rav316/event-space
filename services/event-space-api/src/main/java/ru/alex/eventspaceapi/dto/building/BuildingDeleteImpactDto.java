package ru.alex.eventspaceapi.dto.building;

public record BuildingDeleteImpactDto(
        long faculties,
        long users,
        long spaces,
        long events
) {
}
