--liquibase formatted sql

--changeset alex:1
DELETE FROM space
WHERE capacity IS NULL;

--changeset alex:2
ALTER TABLE space
ALTER COLUMN capacity
SET NOT NULL;