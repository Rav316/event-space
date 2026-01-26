package ru.alex.eventspaceapi.dto.space;

import ru.alex.eventspaceapi.dto.building.BuildingReadDto;

public record SpaceReadDto(
        Integer id,
        String name,
        Short capacity,
        BuildingReadDto building
) {
}
