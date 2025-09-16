package ru.alex.eventspaceapi.dto.response;

import java.time.Instant;

public record ErrorResponse (
        Instant timestamp,
        Object message
) {
}
