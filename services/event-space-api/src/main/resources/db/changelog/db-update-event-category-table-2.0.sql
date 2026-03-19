--liquibase formatted sql

--changeset alex:1
UPDATE event_category SET color = '#f97316' WHERE name = 'IT-секции';
UPDATE event_category SET color = '#a855f7' WHERE name = 'Культурные';
UPDATE event_category SET color = '#3b82f6' WHERE name = 'Учебные';
UPDATE event_category SET color = '#22c55e' WHERE name = 'Спортивные';
UPDATE event_category SET color = '#ec4899' WHERE name = 'Социальные';
