package ru.alex.emailnotificationservice.listener;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;
import ru.alex.emailnotificationservice.messaging.EventReminderMessage;
import ru.alex.emailnotificationservice.service.EventEmailService;

@Component
@RequiredArgsConstructor
@Slf4j
public class EventReminderListener {

    private final EventEmailService eventEmailService;

    @RabbitListener(queues = "${app.messaging.rabbit.reminder-queue}")
    public void handleEventReminder(EventReminderMessage message) {
        log.info("Received event.reminder message for event {} to {}", message.eventId(), message.recipientEmail());
        eventEmailService.sendEventReminder(message);
    }
}
