package ru.alex.eventspaceapi.dto.event;

import ru.alex.eventspaceapi.dto.eventStep.EventStepReadDto;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public record EventDetailsDto(
        Integer id,
        String name,
        String shortDescription,
        String description,
        Integer category,
        Integer registeredUsers,
        Integer participantQuantity,
        String[] tags,
        LocalDate eventDate,
        LocalTime startTime,
        LocalTime endTime,
        LocalDate deadline,
        List<EventStepReadDto> steps,
        Integer building,
        Integer space,
        String imageUrl,
        Boolean canModify
) {
}
