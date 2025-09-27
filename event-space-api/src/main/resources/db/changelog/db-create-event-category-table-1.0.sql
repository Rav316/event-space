--liquibase formatted sql

--changeset alex:1
ALTER TABLE event_type
RENAME TO event_category;