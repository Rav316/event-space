--liquibase formatted sql

--changeset alex:1
ALTER TABLE users
ADD COLUMN password text NOT NULL DEFAULT '{noop}pass';