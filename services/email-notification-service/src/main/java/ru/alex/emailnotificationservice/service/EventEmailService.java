package ru.alex.emailnotificationservice.service;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import ru.alex.emailnotificationservice.config.MailProperties;
import ru.alex.emailnotificationservice.messaging.EventCreatedMessage;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import java.nio.charset.StandardCharsets;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class EventEmailService {

    private final JavaMailSender mailSender;
    private final MailProperties mailProperties;

    private String fromAddress;

    @PostConstruct
    void init() {
        if (mailProperties.from() == null || mailProperties.from().isBlank()) {
            throw new IllegalStateException("Property app.mail.from must be configured");
        }
        this.fromAddress = mailProperties.from();
    }

    public void sendEventCreated(EventCreatedMessage message) {
        List<String> recipients = message.recipients();
        if (recipients == null || recipients.isEmpty()) {
            log.info("Skip sending email: no recipients for event {}", message.eventId());
            return;
        }
        for (String recipient : recipients) {
            try {
                sendSingle(message, recipient);
            } catch (MessagingException e) {
                log.error("Failed to send email about event {} to {}", message.eventId(), recipient, e);
            }
        }
    }

    private void sendSingle(EventCreatedMessage message, String recipient) throws MessagingException {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED,
                StandardCharsets.UTF_8.name());

        helper.setFrom(fromAddress);
        helper.setTo(recipient);
        helper.setSubject("Новое мероприятие: " + message.name());

        String body = buildBody(message);
        helper.setText(body, true);

        mailSender.send(mimeMessage);
    }

    private String buildBody(EventCreatedMessage message) {
        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("dd.MM.yyyy");
        DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("HH:mm");

        String eventDate = message.eventDate() != null ? message.eventDate().format(dateFormatter) : "";
        String startTime = message.startTime() != null ? message.startTime().format(timeFormatter) : "";
        String endTime = message.endTime() != null ? message.endTime().format(timeFormatter) : "";

        String imageSection = message.imageUrl() != null ?
                "<p><img src='" + message.imageUrl() + "' alt='Event image' style='max-width:600px;width:100%;height:auto;'/></p>"
                : "";

        return """
                <div style='font-family: Arial, sans-serif; line-height: 1.5;'>
                  <h2>Новое мероприятие: %s</h2>
                  <p><strong>Дата:</strong> %s</p>
                  <p><strong>Время:</strong> %s - %s</p>
                  <p>%s</p>
                  %s
                  <p>Не отвечайте на это письмо. Если вы хотите отписаться, выключите переключатель "Уведомления о новых мероприятиях" в настройках профиля.</p>
                </div>
                """.formatted(
                safe(message.name()),
                safe(eventDate),
                safe(startTime),
                safe(endTime),
                safe(message.shortDescription()),
                imageSection
        );
    }

    private String safe(String value) {
        return value == null ? "" : value;
    }
}
