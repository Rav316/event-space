package ru.alex.emailnotificationservice.config;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.QueueBuilder;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.amqp.rabbit.annotation.EnableRabbit;
import org.springframework.amqp.rabbit.config.SimpleRabbitListenerContainerFactory;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.JacksonJsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableRabbit
@EnableConfigurationProperties({RabbitProperties.class, MailProperties.class})
public class RabbitConfig {

    @Bean
    public Queue eventNotificationQueue(RabbitProperties properties) {
        return QueueBuilder.durable(properties.queue()).build();
    }

    @Bean
    public TopicExchange eventNotificationExchange(RabbitProperties properties) {
        return new TopicExchange(properties.exchange(), true, false);
    }

    @Bean
    public Binding eventNotificationBinding(
            Queue eventNotificationQueue,
            TopicExchange eventNotificationExchange,
            RabbitProperties properties
    ) {
        return BindingBuilder
                .bind(eventNotificationQueue)
                .to(eventNotificationExchange)
                .with(properties.routingKey());
    }

    @Bean
    public Queue eventReminderQueue(RabbitProperties properties) {
        return QueueBuilder.durable(properties.reminderQueue()).build();
    }

    @Bean
    public Binding eventReminderBinding(
            Queue eventReminderQueue,
            TopicExchange eventNotificationExchange,
            RabbitProperties properties
    ) {
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

    @Bean
    public SimpleRabbitListenerContainerFactory rabbitListenerContainerFactory(ConnectionFactory connectionFactory,
                                                                               MessageConverter messageConverter) {
        SimpleRabbitListenerContainerFactory factory = new SimpleRabbitListenerContainerFactory();
        factory.setConnectionFactory(connectionFactory);
        factory.setMessageConverter(messageConverter);
        return factory;
    }
}
