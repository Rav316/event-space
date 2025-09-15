--liquibase formatted sql

--changeset alex:1
CREATE TABLE event_user
(
    event_id int REFERENCES event(id),
    user_id int REFERENCES users(id),
    PRIMARY KEY (event_id, user_id)
)