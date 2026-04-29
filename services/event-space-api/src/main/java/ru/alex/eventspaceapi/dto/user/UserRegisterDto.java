package ru.alex.eventspaceapi.dto.user;

import jakarta.validation.constraints.*;
import ru.alex.eventspaceapi.model.Role;
import ru.alex.eventspaceapi.validation.EnumIndex;

public record UserRegisterDto(
        @NotNull
        @Size(min = 2, max = 64)
        String firstName,
        @NotNull
        @Size(min = 2, max = 64)
        String lastName,
        @NotNull
        @Email
        String email,
        @NotNull
        @EnumIndex(enumClass = Role.class)
        Integer role,
        @NotNull
        Integer program,
        @Min(1)
        @Max(4)
        Short course,
        @NotNull
        @Size(min = 8)
        String password
) {
}
