--liquibase formatted sql

--changeset alex:1
TRUNCATE TABLE space CASCADE ;

--changeset alex:2
ALTER TABLE space
ADD COLUMN space_type_id int REFERENCES space_type(id) NOT NULL ;