--liquibase formatted sql

--changeset alex:1
INSERT INTO complaint_type(id, name)
VALUES
(1, 'Спам'),
(2, 'Оскорбительное содержание'),
(3, 'Ложная информация'),
(4, 'Неприемлемый контент'),
(5, 'Нарушение правил сообщества'),
(6, 'Другое');

--changeset alex:2
SELECT SETVAL('complaint_type_id_seq', (SELECT MAX(id) FROM complaint_type));

