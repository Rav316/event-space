package ru.alex.eventspaceapi.messaging;

import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Component;
import ru.alex.eventspaceapi.config.RabbitProperties;

@Component
@RequiredArgsConstructor
public class EventNotificationPublisher {

    private final RabbitTemplate rabbitTemplate;
    private final RabbitProperties rabbitProperties;

    public void publishEventCreated(EventCreatedMessage message) {
        rabbitTemplate.convertAndSend(
                rabbitProperties.exchange(),
                rabbitProperties.routingKey(),
                message
        );
    }
}
