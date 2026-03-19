--liquibase formatted sql

--changeset alex:1
ALTER TABLE complaint
ALTER COLUMN admin_comment TYPE varchar(500);
