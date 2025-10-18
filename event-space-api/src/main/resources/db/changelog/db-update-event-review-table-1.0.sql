--liquibase formatted sql

--changeset alex:1
ALTER TABLE event_review
ADD CONSTRAINT event_review_user_id_event_id_key
UNIQUE (event_id, user_id)