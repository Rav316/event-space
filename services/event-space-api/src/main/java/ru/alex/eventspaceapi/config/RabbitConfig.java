package ru.alex.eventspaceapi.config;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.JacksonJsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableConfigurationProperties({RabbitProperties.class, ReminderProperties.class})
public class RabbitConfig {

    @Bean
    public Queue eventNotificationQueue(RabbitProperties properties) {
        return new Queue(properties.queue(), true);
    }

    @Bean
    public TopicExchange eventNotificationExchange(RabbitProperties properties) {
        return new TopicExchange(properties.exchange(), true, false);
    }

    @Bean
    public Binding eventNotificationBinding(Queue eventNotificationQueue,
                                            TopicExchange eventNotificationExchange,
                                            RabbitProperties properties) {
        return BindingBuilder
                .bind(eventNotificationQueue)
                .to(eventNotificationExchange)
                .with(properties.routingKey());
    }

    @Bean
    public Queue eventReminderQueue(RabbitProperties properties) {
        return new Queue(properties.reminderQueue(), true);
    }

    @Bean
    public Binding eventReminderBinding(Queue eventReminderQueue,
                                        TopicExchange eventNotificationExchange,
                                        RabbitProperties properties) {
        return BindingBuilder
                .bind(eventReminderQueue)
                .to(eventNotificationExchange)
                .with(properties.reminderRoutingKey());
    }

    @Bean
    public MessageConverter jacksonMessageConverter() {
        return new JacksonJsonMessageConverter();
    }

    @Bean
    public RabbitTemplate rabbitTemplate(ConnectionFactory connectionFactory, MessageConverter messageConverter) {
        RabbitTemplate template = new RabbitTemplate(connectionFactory);
        template.setMessageConverter(messageConverter);
        return template;
    }
}
