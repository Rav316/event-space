package ru.alex.eventspaceapi.dto.user;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record UserPasswordChangeDto(
        @NotNull
        String currentPassword,
        @NotNull
        @Size(min = 8)
        String newPassword,
        @NotNull
        @Size(min = 8)
        String confirmPassword
) {
}
