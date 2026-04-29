package ru.alex.eventspaceapi.dto.user;

import ru.alex.eventspaceapi.dto.program.ProgramListDto;

public record UserAdminListDto(
        Integer id,
        String firstName,
        String lastName,
        String email,
        Integer role,
        Integer course,
        ProgramListDto program,
        boolean active,
        String avatarUrl
) {
}
