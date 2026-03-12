package ru.alex.eventspaceapi.database.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import ru.alex.eventspaceapi.database.entity.EventCategory;
import ru.alex.eventspaceapi.dto.filter.AdminListFilter;
import ru.alex.eventspaceapi.dto.statistics.CategoryStatisticsDto;

public interface EventCategoryRepositoryCustom {
    Page<EventCategory> findAllByFilter(AdminListFilter filter, Sort sort);
    CategoryStatisticsDto getCategoryStatistics(Integer userId);
}
