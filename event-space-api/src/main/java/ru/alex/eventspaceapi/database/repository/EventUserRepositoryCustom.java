package ru.alex.eventspaceapi.database.repository;

import ru.alex.eventspaceapi.dto.event.EventStatisticsDto;

public interface EventUserRepositoryCustom {
    EventStatisticsDto getUserEventStatistics(Integer userId);
}
