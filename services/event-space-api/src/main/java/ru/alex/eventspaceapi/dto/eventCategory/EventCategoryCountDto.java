package ru.alex.eventspaceapi.dto.eventCategory;

public record EventCategoryCountDto(
        Integer id,
        String name,
        String color,
        Integer eventCount
) {
}
