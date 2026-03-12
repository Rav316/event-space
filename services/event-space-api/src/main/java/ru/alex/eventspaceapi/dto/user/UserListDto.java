package ru.alex.eventspaceapi.dto.user;

import ru.alex.eventspaceapi.dto.faculty.FacultyListDto;

public record UserListDto(
        Integer id,
        String firstName,
        String lastName,
        String email,
        Integer role,
        Integer course,
        FacultyListDto faculty,
        boolean active
) {
}
