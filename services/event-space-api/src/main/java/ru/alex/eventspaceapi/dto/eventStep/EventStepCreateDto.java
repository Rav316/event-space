package ru.alex.eventspaceapi.dto.eventStep;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalTime;

public record EventStepCreateDto(
        @NotNull
        @Size(min = 5, max = 64)
        String name,
        @NotNull
        LocalTime startTime,
        @NotNull
        LocalTime endTime,
        @Size(max = 500)
        String description
) {
}
