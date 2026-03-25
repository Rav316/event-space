--liquibase formatted sql

--changeset alex:1
ALTER TABLE building
    ADD COLUMN latitude  DOUBLE PRECISION,
    ADD COLUMN longitude DOUBLE PRECISION;
