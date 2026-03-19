package ru.alex.eventspaceapi.dto.user;

import jakarta.validation.constraints.NotNull;
import ru.alex.eventspaceapi.model.Role;
import ru.alex.eventspaceapi.validation.EnumIndex;

public record UserRoleChangeDto(
        @NotNull
        @EnumIndex(enumClass = Role.class)
        Integer role
) {
}
