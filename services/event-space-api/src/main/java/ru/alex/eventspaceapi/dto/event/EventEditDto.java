package ru.alex.eventspaceapi.dto.event;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Size;
import ru.alex.eventspaceapi.dto.eventStep.EventStepCreateDto;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public record EventEditDto(
        @Size(min = 5, max = 128)
        String name,
        List<String> tags,
        LocalDate eventDate,
        LocalTime startTime,
        LocalTime endTime,
        LocalDate deadline,
        Integer space,
        @Size(max = 130)
        String shortDescription,
        @Size(max = 200)
        String description,
        Integer category,
        @Min(0)
        Integer participantQuantity,
        List<EventStepCreateDto> steps
) {
}
