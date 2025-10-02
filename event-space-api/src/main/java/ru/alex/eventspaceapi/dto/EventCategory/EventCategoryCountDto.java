package ru.alex.eventspaceapi.dto.EventCategory;

public record EventCategoryCountDto(
        Integer id,
        String name,
        Integer eventCount
) {
}
