package ru.alex.eventspaceapi.dto.user;

import jakarta.validation.constraints.NotNull;

public record UserDeleteDto(
        @NotNull
        String currentPassword,
        @NotNull
        String confirmationPhrase
) {
}
