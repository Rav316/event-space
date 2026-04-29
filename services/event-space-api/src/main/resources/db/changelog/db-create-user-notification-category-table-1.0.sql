--liquibase formatted sql

--changeset alex:1
CREATE TABLE user_notification_category (
    user_id     INT NOT NULL REFERENCES users(id)          ON DELETE CASCADE,
    category_id INT NOT NULL REFERENCES event_category(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, category_id)
);
