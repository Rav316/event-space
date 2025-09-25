--liquibase formatted sql

--changeset alex:1
ALTER TABLE space
ADD COLUMN floor smallint;

--changeset alex:2
ALTER TABLE space
ADD COLUMN capacity smallint;