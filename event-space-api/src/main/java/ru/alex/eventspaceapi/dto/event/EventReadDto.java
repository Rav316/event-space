package ru.alex.eventspaceapi.dto.event;

import ru.alex.eventspaceapi.dto.eventCategory.EventCategoryReadDto;
import ru.alex.eventspaceapi.dto.space.SpaceReadDto;
import ru.alex.eventspaceapi.dto.user.UserEventAuthorDto;

import java.time.LocalDate;
import java.time.LocalTime;

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
        LocalDate deadline,
        SpaceReadDto space,
        Integer registeredUsers,
        Integer participantQuantity,
        UserEventAuthorDto author,
        Boolean isRegistered,
        Boolean canRegister,
        Boolean canUnregister,
        Boolean isAttended,
        String qrToken
) {
}
