package ru.alex.eventspaceapi.dto.eventCategory;

public record EventCategoryCountDto(
        Integer id,
        String name,
        Integer eventCount
) {
}
