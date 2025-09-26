--liquibase formatted sql

--changeset alex:1
DELETE FROM event;

--changeset alex:2
ALTER TABLE event
ADD COLUMN short_description varchar(120) NOT NULL ;