--liquibase formatted sql

--changeset alex:1
ALTER TABLE complaint
ADD COLUMN admin_comment varchar(128);

--changeset alex:2
ALTER TABLE complaint
ADD COLUMN reviewed_by int REFERENCES users(id);

--changeset alex:3
ALTER TABLE complaint
ADD COLUMN reviewed_at timestamp with time zone;