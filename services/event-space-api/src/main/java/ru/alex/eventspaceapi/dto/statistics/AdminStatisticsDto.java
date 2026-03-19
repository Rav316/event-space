package ru.alex.eventspaceapi.dto.statistics;

import java.time.LocalDate;
import java.util.List;

public record AdminStatisticsDto(
        Long totalUsers,
        Long activeUsers,
        Long totalEvents,
        Long activeEvents,
        Long pendingComplaints,
        List<UserPreviewDto> latestUsers,
        List<EventPreviewDto> latestActiveEvents
) {
    public record UserPreviewDto(
            Integer id,
            String firstName,
            String lastName,
            String avatarUrl,
            boolean active
    ) {}

    public record EventPreviewDto(
            Integer id,
            String name,
            LocalDate eventDate,
            Integer participantQuantity,
            Long registeredUsers,
            String authorFirstName,
            String authorLastName
    ) {}
}
