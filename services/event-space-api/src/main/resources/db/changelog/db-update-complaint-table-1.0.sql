--liquibase formatted sql

--changeset alex:1
ALTER TABLE complaint
ADD COLUMN description varchar(500);