package ru.alex.eventspaceapi.service;

import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.alex.eventspaceapi.database.repository.EventCategoryRepository;
import ru.alex.eventspaceapi.database.repository.EventReviewRepository;
import ru.alex.eventspaceapi.database.repository.EventUserRepository;
import ru.alex.eventspaceapi.dto.eventReview.EventReviewStatisticsDto;
import ru.alex.eventspaceapi.dto.statistics.*;

import java.util.Objects;

import static ru.alex.eventspaceapi.util.AuthUtils.getAuthorizedUser;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class StatisticsService {
    private final EventUserRepository eventUserRepository;
    private final EventReviewRepository eventReviewRepository;
    private final EventCategoryRepository eventCategoryRepository;

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

    public UserProfileStatisticsDto getUserProfileStatistics() {
        return eventUserRepository.getUserProfileStatistics(
                Objects.requireNonNull(getAuthorizedUser()).id()
        );
    }

    @Cacheable(value = "reviewStats", key = "T(ru.alex.eventspaceapi.util.AuthUtils).getAuthorizedUser().id()")
    public EventReviewStatisticsDto getEventReviewStatistics() {
        return eventReviewRepository.getEventReviewStatistics(Objects.requireNonNull(getAuthorizedUser()).id());
    }

    public CategoryStatisticsDto getCategoryStatistics() {
        return eventCategoryRepository.getCategoryStatistics(Objects.requireNonNull(getAuthorizedUser()).id());
    }

}
