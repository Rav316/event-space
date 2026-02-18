package ru.alex.eventspaceapi.dto.event;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import ru.alex.eventspaceapi.dto.eventStep.EventStepCreateDto;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public record EventCreateDto (
        @NotNull
        @Size(min = 5, max = 128)
        String name,
        List<String> tags,
        @NotNull
        LocalDate eventDate,
        @NotNull
        LocalTime startTime,
        @NotNull
        LocalTime endTime,
        LocalDate deadline,
        @NotNull
        Integer space,
        @Size(max = 130)
        String shortDescription,
        @Size(max = 1000)
        String description,
        @NotNull
        Integer category,
        @NotNull
        @Min(0)
        Integer participantQuantity,
        List<EventStepCreateDto> steps
) {
}
