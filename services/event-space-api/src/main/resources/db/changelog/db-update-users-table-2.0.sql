--liquibase formatted sql

--changeset alex:1
ALTER TABLE users
ADD COLUMN new_event_notifications boolean NOT NULL DEFAULT false;
