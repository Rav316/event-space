package ru.alex.eventspaceapi.dto.event;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import ru.alex.eventspaceapi.dto.eventStep.EventStepCreateDto;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public record EventCreateDto (
        @NotNull
        String name,
        @Size(min = 1)
        List<String> tags,
        @NotNull
        LocalDate eventDate,
        @NotNull
        LocalTime startTime,
        @NotNull
        LocalTime endTime,
        @NotNull
        Integer space,
        String description,
        @NotNull
        Integer eventType,
        @NotNull
        List<EventStepCreateDto> steps
) {
}
