--liquibase formatted sql

--changeset alex:1
UPDATE space
SET floor = (trunc(random() * 10) + 1)::smallint;

--changeset alex:2
UPDATE space
SET capacity = (trunc(random() * (150 - 20 + 1)) + 20)::integer;
