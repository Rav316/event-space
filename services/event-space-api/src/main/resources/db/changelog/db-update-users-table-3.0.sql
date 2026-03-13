--liquibase formatted sql

--changeset alex:1
ALTER TABLE users
ADD COLUMN password_changed_at timestamp with time zone;