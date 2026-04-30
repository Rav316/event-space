package ru.alex.eventspaceapi.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.validation.annotation.Validated;

import java.time.Duration;
import java.time.ZoneId;

@Validated
@ConfigurationProperties(prefix = "app.reminder")
public record ReminderProperties(
        ZoneId zone,
        Duration leadTime,
        int batchSize,
        int maxAttempts
) {
    public ReminderProperties {
        if (zone == null) zone = ZoneId.of("Europe/Moscow");
        if (leadTime == null) leadTime = Duration.ofHours(24);
        if (batchSize <= 0) batchSize = 100;
        if (maxAttempts <= 0) maxAttempts = 5;
    }
}
