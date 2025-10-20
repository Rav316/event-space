--liquibase formatted sql

--changeset alex:1
ALTER TABLE event_review DROP CONSTRAINT event_review_user_id_fkey;

--changeset alex:2
ALTER TABLE event_review DROP CONSTRAINT event_review_event_id_fkey;

--changeset alex:3
ALTER TABLE event_review
ADD CONSTRAINT event_review_user_id_fkey
FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE;

--changeset alex:4
ALTER TABLE event_review
ADD CONSTRAINT event_review_event_id_fkey
FOREIGN KEY (event_id) REFERENCES event (id) ON DELETE CASCADE;