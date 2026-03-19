--liquibase formatted sql

--changeset alex:1
ALTER TABLE faculty
    DROP CONSTRAINT faculty_building_id_fkey,
    ADD CONSTRAINT faculty_building_id_fkey
        FOREIGN KEY (building_id) REFERENCES building (id) ON DELETE CASCADE;

--changeset alex:2
ALTER TABLE space
    DROP CONSTRAINT space_building_id_fkey,
    ADD CONSTRAINT space_building_id_fkey
        FOREIGN KEY (building_id) REFERENCES building (id) ON DELETE CASCADE;

--changeset alex:3
ALTER TABLE users
    DROP CONSTRAINT users_faculty_id_fkey,
    ADD CONSTRAINT users_faculty_id_fkey
        FOREIGN KEY (faculty_id) REFERENCES faculty (id) ON DELETE CASCADE;

--changeset alex:4
ALTER TABLE event
    DROP CONSTRAINT event_space_id_fkey,
    ADD CONSTRAINT event_space_id_fkey
        FOREIGN KEY (space_id) REFERENCES space (id) ON DELETE CASCADE;

--changeset alex:5
ALTER TABLE event_user
    DROP CONSTRAINT event_user_confirmed_by_fkey,
    ADD CONSTRAINT event_user_confirmed_by_fkey
        FOREIGN KEY (confirmed_by) REFERENCES users (id) ON DELETE SET NULL;

--changeset alex:6
ALTER TABLE helpful_mark
    DROP CONSTRAINT helpful_mark_user_id_fkey,
    ADD CONSTRAINT helpful_mark_user_id_fkey
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE;

--changeset alex:7
ALTER TABLE helpful_mark
    DROP CONSTRAINT helpful_mark_review_id_fkey,
    ADD CONSTRAINT helpful_mark_review_id_fkey
        FOREIGN KEY (review_id) REFERENCES event_review (id) ON DELETE CASCADE;

--changeset alex:8
ALTER TABLE complaint
    DROP CONSTRAINT complaint_author_id_fkey,
    ADD CONSTRAINT complaint_author_id_fkey
        FOREIGN KEY (author_id) REFERENCES users (id) ON DELETE CASCADE;
