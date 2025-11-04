package ru.alex.eventspaceapi.http.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.alex.eventspaceapi.dto.statistics.EventStatisticsDto;
import ru.alex.eventspaceapi.dto.statistics.OverviewStatisticsDto;
import ru.alex.eventspaceapi.dto.statistics.UserProfileStatisticsDto;
import ru.alex.eventspaceapi.dto.statistics.UserStatisticsDto;
import ru.alex.eventspaceapi.service.StatisticsService;

import static org.springframework.http.HttpStatus.OK;

@RestController
@RequestMapping("/api/statistics")
@RequiredArgsConstructor
public class StatisticsController {
    private final StatisticsService statisticsService;

    @GetMapping("/user")
    public ResponseEntity<UserStatisticsDto> getUserStatistics() {
        return new ResponseEntity<>(statisticsService.getUserStatistics(), OK);
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
}
