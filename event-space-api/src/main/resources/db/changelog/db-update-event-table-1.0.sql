--liquibase formatted sql

--changeset alex:1
TRUNCATE TABLE event CASCADE ;

--changeset alex:2
ALTER TABLE event
ADD COLUMN event_type_id int REFERENCES event_type(id) NOT NULL;