--liquibase formatted sql

--changeset alex:1
ALTER TABLE event
    DROP CONSTRAINT event_event_type_id_fkey,
    ADD CONSTRAINT event_event_type_id_fkey
        FOREIGN KEY (event_category_id) REFERENCES event_category (id) ON DELETE CASCADE;
