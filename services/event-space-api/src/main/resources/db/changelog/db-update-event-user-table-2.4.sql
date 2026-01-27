--liquibase formatted sql

--changeset alex:1
CREATE INDEX idx_event_user_event_id
ON event_user (event_id);
