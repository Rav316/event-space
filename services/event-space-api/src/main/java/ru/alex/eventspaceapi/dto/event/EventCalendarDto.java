package ru.alex.eventspaceapi.dto.event;

import ru.alex.eventspaceapi.dto.eventCategory.EventCategoryReadDto;

import java.time.LocalDate;
import java.time.LocalTime;

public record EventCalendarDto(
        Integer id,
        String name,
        EventCategoryReadDto category,
        LocalDate eventDate,
        LocalTime startTime,
        LocalTime endTime
) {
}
