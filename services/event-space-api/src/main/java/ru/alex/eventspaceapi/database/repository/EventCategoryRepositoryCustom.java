package ru.alex.eventspaceapi.database.repository;

import ru.alex.eventspaceapi.dto.statistics.CategoryStatisticsDto;

public interface EventCategoryRepositoryCustom {

    CategoryStatisticsDto getCategoryStatistics(Integer userId);
}
