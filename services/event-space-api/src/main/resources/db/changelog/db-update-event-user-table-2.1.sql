--liquibase formatted sql

--changeset alex:1
ALTER TABLE event_user
ADD COLUMN qr_token uuid UNIQUE;

--changeset alex:2
ALTER TABLE event_user
ADD COLUMN confirmed_by int REFERENCES users;

--changeset alex:3
ALTER TABLE event_user
ADD COLUMN confirmed_at timestamp;