package ru.alex.eventspaceapi.dto.response;

import ru.alex.eventspaceapi.dto.user.UserReadDto;

public record AuthResponse (
        UserReadDto user,
        String accessToken,
        String refreshToken
) {
}
