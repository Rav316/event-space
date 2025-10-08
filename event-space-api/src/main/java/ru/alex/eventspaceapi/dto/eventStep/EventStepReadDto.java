package ru.alex.eventspaceapi.dto.eventStep;

import java.time.LocalTime;

public record EventStepReadDto(
        Integer id,
        String name,
        LocalTime startTime,
        LocalTime endTime,
        String description
) {
}
