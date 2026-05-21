--liquibase formatted sql

--changeset alex:1
ALTER TABLE space
ADD CONSTRAINT space_capacity_check CHECK ( capacity > 0 )