package ru.alex.emailnotificationservice.listener;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;
import ru.alex.emailnotificationservice.messaging.EventCreatedMessage;
import ru.alex.emailnotificationservice.service.EventEmailService;

@Component
@RequiredArgsConstructor
@Slf4j
public class EventCreatedListener {

    private final EventEmailService eventEmailService;

    @RabbitListener(queues = "${app.messaging.rabbit.queue}")
    public void handleEventCreated(EventCreatedMessage message) {
        log.info("Received event.created message for event {} to {} recipients", message.eventId(),
                message.recipients() == null ? 0 : message.recipients().size());
        eventEmailService.sendEventCreated(message);
    }
}
