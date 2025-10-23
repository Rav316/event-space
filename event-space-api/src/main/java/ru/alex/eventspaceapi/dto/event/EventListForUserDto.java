package ru.alex.eventspaceapi.dto.event;

import ru.alex.eventspaceapi.dto.space.SpaceReadDto;

import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalTime;

public record EventListForUserDto(
        Integer id,
        String name,
        LocalDate eventDate,
        LocalTime startTime,
        LocalTime endTime,
        SpaceReadDto space,
        Instant registeredAt
) {
}
