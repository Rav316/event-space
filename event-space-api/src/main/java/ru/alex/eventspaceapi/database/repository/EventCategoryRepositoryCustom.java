package ru.alex.eventspaceapi.database.repository;

import ru.alex.eventspaceapi.dto.statistics.CategoryStatisticsDto;

import java.util.List;

public interface EventCategoryRepositoryCustom {

    List<CategoryStatisticsDto> getCategoryStatistics(Integer userId);
}
