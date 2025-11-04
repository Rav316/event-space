package ru.alex.eventspaceapi.service;

import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.alex.eventspaceapi.database.repository.EventUserRepository;
import ru.alex.eventspaceapi.dto.statistics.EventStatisticsDto;
import ru.alex.eventspaceapi.dto.statistics.OverviewStatisticsDto;
import ru.alex.eventspaceapi.dto.statistics.UserStatisticsDto;

import java.util.Objects;

import static ru.alex.eventspaceapi.util.AuthUtils.getAuthorizedUser;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class StatisticsService {
    private final EventUserRepository eventUserRepository;

    public EventStatisticsDto getUserEventsStatistics() {
        return eventUserRepository.getUserEventStatistics(Objects.requireNonNull(getAuthorizedUser()).id());
    }

    public UserStatisticsDto getUserStatistics() {
        return eventUserRepository.getUserStatistics(Objects.requireNonNull(getAuthorizedUser()).id());
    }

    @Cacheable(value = "overviewStats", key = "T(ru.alex.eventspaceapi.util.AuthUtils).getAuthorizedUser().id()")
    public OverviewStatisticsDto getOverviewStatistics() {
        return eventUserRepository.getOverviewStatistics(
                Objects.requireNonNull(getAuthorizedUser()).id()
        );
    }

}
