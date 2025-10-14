--liquibase formatted sql

--changeset alex:1
ALTER TABLE event
DROP COLUMN author;

--changeset alex:2
ALTER TABLE event
ADD COLUMN author int REFERENCES users ON DELETE SET NULL ;