package ru.alex.eventspaceapi.dto.user;

import jakarta.validation.constraints.*;

public record UserEditDto(
        @NotNull
        @Size(min = 2, max = 64)
        String firstName,
        @NotNull
        @Size(min = 2, max = 64)
        String lastName,
        @NotNull
        @Email
        String email,
        String phone,
        @NotNull
        Integer faculty,
        @Min(1)
        @Max(4)
        Integer course,
        String description,
        String tgUsername,
        String vkUrl,
        String githubUrl
) {
}
