--liquibase formatted sql

--changeset alex:1
ALTER TABLE users
DROP CONSTRAINT IF EXISTS users_phone_key