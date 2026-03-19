--liquibase formatted sql

--changeset alex:1
INSERT INTO users (first_name, last_name, email, password, role, is_active, register_date, faculty_id)
VALUES ('Admin', 'Admin', 'admin@admin.com', '{noop}pass', 'ADMIN', true, CURRENT_DATE, 1);
