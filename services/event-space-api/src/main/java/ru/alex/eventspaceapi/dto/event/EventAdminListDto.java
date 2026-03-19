package ru.alex.eventspaceapi.dto.event;

import ru.alex.eventspaceapi.dto.eventCategory.EventCategoryReadDto;

import java.time.LocalDate;

public record EventAdminListDto(
        Integer id,
        String name,
        String author,
        EventCategoryReadDto category,
        LocalDate eventDate,
        Integer registeredUsers,
        Integer participantQuantity,
        Integer status
) {
}
