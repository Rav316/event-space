package ru.alex.eventspaceapi.dto.statistics;

import ru.alex.eventspaceapi.dto.eventCategory.EventCategoryReadDto;

import java.util.List;

public record CategoryStatisticsDto(
        List<CategoryDistributionDto> categoriesDistribution,
        List<CategoryActivityDto> categoriesActivity
) {
    public record CategoryDistributionDto(
            EventCategoryReadDto category,
            Integer count
    ) {}

    public record CategoryActivityDto(
            EventCategoryReadDto category,
            Double activityPercent
    ) {}
}
