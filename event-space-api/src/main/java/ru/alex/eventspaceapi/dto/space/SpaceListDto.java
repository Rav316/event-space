package ru.alex.eventspaceapi.dto.space;

public record SpaceListDto(
        Integer id,
        String name,
        String type,
        Short floor,
        Short capacity
) {
}
