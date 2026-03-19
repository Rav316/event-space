--liquibase formatted sql

--changeset alex:1
ALTER TABLE complaint
    DROP COLUMN target,
    ADD COLUMN target_type varchar(64) NOT NULL,
    ADD COLUMN target_id int NOT NULL,
    ADD COLUMN target_snapshot jsonb NOT NULL;
