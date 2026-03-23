--liquibase formatted sql

--changeset alex:1
ALTER TABLE event_step
ALTER COLUMN description TYPE varchar(500);
