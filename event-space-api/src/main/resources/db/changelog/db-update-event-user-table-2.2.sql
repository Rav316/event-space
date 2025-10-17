--liquibase formatted sql

--changeset alex:1
ALTER TABLE event_user
ALTER COLUMN confirmed_at TYPE timestamptz
USING confirmed_at AT TIME ZONE 'UTC';