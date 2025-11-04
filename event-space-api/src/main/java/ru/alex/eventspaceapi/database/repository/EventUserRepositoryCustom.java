package ru.alex.eventspaceapi.database.repository;

import ru.alex.eventspaceapi.dto.statistics.EventStatisticsDto;
import ru.alex.eventspaceapi.dto.statistics.OverviewStatisticsDto;
import ru.alex.eventspaceapi.dto.statistics.UserStatisticsDto;

public interface EventUserRepositoryCustom {
    EventStatisticsDto getUserEventStatistics(Integer userId);

    UserStatisticsDto getUserStatistics(Integer userId);

    OverviewStatisticsDto getOverviewStatistics(Integer userId);
}
