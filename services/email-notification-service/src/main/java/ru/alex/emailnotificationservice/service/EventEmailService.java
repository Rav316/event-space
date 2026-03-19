package ru.alex.emailnotificationservice.service;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;
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

    @Value("${app.website-url}")
    private String websiteUrl;

    private final JavaMailSender mailSender;
    private final MailProperties mailProperties;
    private final SpringTemplateEngine templateEngine;

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
        log.info("Sending event.created emails for event {} to {} recipients", message.eventId(), recipients.size());
        for (String recipient : recipients) {
            try {
                sendSingle(message, recipient);
                log.info("Email sent successfully for event {} to {}", message.eventId(), recipient);
            } catch (MessagingException e) {
                log.error("Failed to send email about event {} to {}: {}", message.eventId(), recipient, e.getMessage(), e);
            }
        }
    }

    private void sendSingle(EventCreatedMessage message, String recipient) throws MessagingException {
        log.debug("Building email for event {} to {}, from={}", message.eventId(), recipient, fromAddress);
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED,
                StandardCharsets.UTF_8.name());

        helper.setFrom(fromAddress);
        helper.setTo(recipient);
        helper.setSubject("Новое мероприятие: " + message.name());

        helper.setText(buildBody(message), true);

        log.debug("Connecting to SMTP and sending email to {}", recipient);
        mailSender.send(mimeMessage);
    }

    private String buildBody(EventCreatedMessage message) {
        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("dd.MM.yyyy");
        DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("HH:mm");

        String eventDate = message.eventDate() != null ? message.eventDate().format(dateFormatter) : "";
        String startTime = message.startTime() != null ? message.startTime().format(timeFormatter) : "";
        String endTime = message.endTime() != null ? message.endTime().format(timeFormatter) : "";

        Context context = new Context();
        context.setVariable("message", message);
        context.setVariable("eventDate", eventDate);
        context.setVariable("startTime", startTime);
        context.setVariable("endTime", endTime);
        context.setVariable("eventUrl", websiteUrl + "/events/" + message.eventId());
        context.setVariable("shortDescription", message.shortDescription());

        return templateEngine.process("email/event-created", context);
    }
}
