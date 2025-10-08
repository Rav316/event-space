package ru.alex.eventspaceapi.dto.event;

import ru.alex.eventspaceapi.dto.eventCategory.EventCategoryReadDto;
import ru.alex.eventspaceapi.dto.eventStep.EventStepReadDto;
import ru.alex.eventspaceapi.dto.space.SpaceReadDto;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public record EventReadDto(
        Integer id,
        String name,
        EventCategoryReadDto category,
        String description,
        String[] tags,
        String imageUrl,
        LocalDate eventDate,
        LocalTime startTime,
        LocalTime endTime,
        SpaceReadDto space,
        Integer participantQuantity,
        String author,
        Boolean isRegistered,
        List<EventStepReadDto> steps
) {
}
