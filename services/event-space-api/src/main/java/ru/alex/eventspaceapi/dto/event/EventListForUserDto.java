package ru.alex.eventspaceapi.dto.event;

import ru.alex.eventspaceapi.dto.eventCategory.EventCategoryReadDto;
import ru.alex.eventspaceapi.dto.space.SpaceReadDto;

import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalTime;

public record EventListForUserDto(
        Integer id,
        String name,
        EventCategoryReadDto category,
        String imageUrl,
        LocalDate eventDate,
        LocalTime startTime,
        LocalTime endTime,
        SpaceReadDto space,
        String qrToken,
        boolean attended,
        Instant registeredAt
) {
}
