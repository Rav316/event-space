package ru.alex.emailnotificationservice.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.validation.annotation.Validated;

@Validated
@ConfigurationProperties(prefix = "app.messaging.rabbit")
public record RabbitProperties(
        String exchange,
        String queue,
        String routingKey
) {
}
