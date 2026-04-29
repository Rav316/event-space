--liquibase formatted sql

--changeset alex:1
CREATE TABLE program_category (
    program_id  INT NOT NULL REFERENCES program(id)         ON DELETE CASCADE,
    category_id INT NOT NULL REFERENCES event_category(id)  ON DELETE CASCADE,
    PRIMARY KEY (program_id, category_id)
);

--changeset alex:2
INSERT INTO program_category (program_id, category_id) VALUES
(1, 1), (1, 3),
(2, 1), (2, 3),
(3, 3),
(4, 3),
(5, 2), (5, 3),
(6, 5), (6, 3),
(7, 5), (7, 3),
(8, 5), (8, 2),
(9, 2), (9, 3),
(10, 2), (10, 3);
