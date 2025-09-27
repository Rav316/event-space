--liquibase formatted sql

--changeset alex:1
ALTER TABLE event
RENAME COLUMN event_type_id TO event_category_id;