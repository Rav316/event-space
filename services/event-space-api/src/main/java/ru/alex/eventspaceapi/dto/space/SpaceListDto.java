package ru.alex.eventspaceapi.dto.space;

public record SpaceListDto(
        Integer id,
        String name,
        Integer building,
        Integer typeId,
        String type,
        Short floor,
        Short capacity
) {
}
