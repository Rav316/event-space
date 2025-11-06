package ru.alex.eventspaceapi.http.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.alex.eventspaceapi.dto.eventReview.EventReviewStatisticsDto;
import ru.alex.eventspaceapi.dto.statistics.EventStatisticsDto;
import ru.alex.eventspaceapi.dto.statistics.OverviewStatisticsDto;
import ru.alex.eventspaceapi.dto.statistics.UserProfileStatisticsDto;
import ru.alex.eventspaceapi.dto.statistics.UserStatisticsDto;
import ru.alex.eventspaceapi.service.StatisticsService;

@RestController
@RequestMapping("/api/statistics")
@RequiredArgsConstructor
public class StatisticsController {
    private final StatisticsService statisticsService;

    @GetMapping("/user")
    public UserStatisticsDto getUserStatistics() {
        return statisticsService.getUserStatistics();
    }

    @GetMapping("/events")
    public EventStatisticsDto getUserStatisticsByEvents() {
        return statisticsService.getUserEventsStatistics();
    }

    @GetMapping("/overview")
    public OverviewStatisticsDto getOverviewStatistics() {
        return statisticsService.getOverviewStatistics();
    }

    @GetMapping("/profile")
    public UserProfileStatisticsDto getUserProfileStatistics() {
        return statisticsService.getUserProfileStatistics();
    }

    @GetMapping("/reviews")
    public EventReviewStatisticsDto getEventReviewsStatistics() {
        return statisticsService.getEventReviewStatistics();
    }
}
