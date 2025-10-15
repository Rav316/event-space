package ru.alex.eventspaceapi.dto.event;

import ru.alex.eventspaceapi.dto.eventCategory.EventCategoryReadDto;
import ru.alex.eventspaceapi.dto.space.SpaceReadDto;

import java.time.LocalDate;
import java.time.LocalTime;

public record EventListDto(
        Integer id,
        String name,
        EventCategoryReadDto category,
        String shortDescription,
        String imageUrl,
        LocalDate eventDate,
        LocalTime startTime,
        LocalTime endTime,
        LocalDate deadline,
        SpaceReadDto space,
        Integer participantQuantity,
        String author,
        Boolean isRegistered,
        Boolean canRegister,
        Boolean canUnregister
) {
}
