package ru.alex.eventspaceapi.dto.building;

public record BuildingReadDto (
        Integer id,
        String name,
        String address,
        Double latitude,
        Double longitude
) {
}
