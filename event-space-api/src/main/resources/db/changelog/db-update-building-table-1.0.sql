--liquibase formatted sql

--changeset alex:1
ALTER TABLE building
    ADD COLUMN name varchar(128);

--changeset alex:2
UPDATE building
SET name = 'building ' || id;

--changeset alex:3
ALTER TABLE building
ALTER COLUMN name SET NOT NULL;

--changeset alex:4
ALTER TABLE building
ADD CONSTRAINT building_name_unique UNIQUE (name);