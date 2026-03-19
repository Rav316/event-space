--liquibase formatted sql

--changeset alex:1
ALTER TABLE event_category
ADD COLUMN color VARCHAR(7) NOT NULL DEFAULT '#6366F1';
