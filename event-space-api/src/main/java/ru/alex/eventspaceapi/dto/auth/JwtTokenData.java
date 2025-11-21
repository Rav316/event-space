package ru.alex.eventspaceapi.dto.auth;

public record JwtTokenData(
        Integer id,
        String email
) {
}
