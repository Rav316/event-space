--liquibase formatted sql

--changeset alex:1
ALTER TABLE event
ADD COLUMN deadline date;