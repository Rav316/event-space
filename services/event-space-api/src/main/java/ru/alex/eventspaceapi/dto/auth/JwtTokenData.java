package ru.alex.eventspaceapi.dto.auth;

import java.time.Instant;

public record JwtTokenData(
        Integer id,
        String email,
        Instant issuedAt
) {
}
