package ru.alex.eventspaceapi.dto.space;

public record SpaceListDto(
        Integer id,
        String name,
        Integer building,
        String type,
        Short floor,
        Short capacity
) {
}
