package ru.alex.eventspaceapi.database.repository;

import ru.alex.eventspaceapi.dto.eventUser.EventStatisticsDto;
import ru.alex.eventspaceapi.dto.eventUser.UserStatisticsDto;

public interface EventUserRepositoryCustom {
    EventStatisticsDto getUserEventStatistics(Integer userId);

    UserStatisticsDto getUserStatistics(Integer userId);
}
