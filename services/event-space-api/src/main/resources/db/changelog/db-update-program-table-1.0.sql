--liquibase formatted sql

--changeset alex:1
ALTER TABLE program DROP COLUMN IF EXISTS building_id;
