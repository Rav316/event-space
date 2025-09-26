package ru.alex.eventspaceapi.dto.eventStep;

import jakarta.validation.constraints.NotNull;

import java.time.LocalTime;

public record EventStepCreateDto(
        @NotNull
        String name,
        @NotNull
        LocalTime startTime,
        @NotNull
        LocalTime endTime,
        String description
) {
}
