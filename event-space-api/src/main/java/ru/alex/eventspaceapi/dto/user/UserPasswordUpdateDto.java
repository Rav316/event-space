package ru.alex.eventspaceapi.dto.user;

import jakarta.validation.constraints.NotNull;

public record UserPasswordUpdateDto(
        @NotNull
        String currentPassword,
        @NotNull
        String newPassword,
        @NotNull
        String confirmPassword
) {
}
