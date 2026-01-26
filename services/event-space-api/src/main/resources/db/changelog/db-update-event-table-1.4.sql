--liquibase formatted sql

--changeset alex:1
ALTER TABLE event
ALTER COLUMN short_description TYPE varchar(130)