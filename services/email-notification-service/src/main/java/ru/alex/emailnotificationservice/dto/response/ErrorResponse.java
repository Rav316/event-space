package ru.alex.emailnotificationservice.dto.response;

import java.time.Instant;

public record ErrorResponse (
        Instant timestamp,
        Object reason
) {
}

