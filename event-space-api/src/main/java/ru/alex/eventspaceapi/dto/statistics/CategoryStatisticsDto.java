package ru.alex.eventspaceapi.dto.statistics;

import ru.alex.eventspaceapi.dto.eventCategory.EventCategoryReadDto;

public record CategoryStatisticsDto(
        EventCategoryReadDto category,
        Integer count
) {
}
