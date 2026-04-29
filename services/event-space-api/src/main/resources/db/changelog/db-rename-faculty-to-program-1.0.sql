--liquibase formatted sql

--changeset alex:1
ALTER TABLE faculty RENAME TO program;

--changeset alex:2
ALTER TABLE users RENAME COLUMN faculty_id TO program_id;
