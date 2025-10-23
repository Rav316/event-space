--liquibase formatted sql

--changeset alex:1
ALTER TABLE event_user
ADD COLUMN registered_at timestamp with time zone NOT NULL DEFAULT NOW();