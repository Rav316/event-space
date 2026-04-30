--liquibase formatted sql

--changeset alex:1
CREATE TABLE event_reminder
(
    id              BIGSERIAL PRIMARY KEY,
    event_id        INT NOT NULL REFERENCES event(id) ON DELETE CASCADE,
    user_id         INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    recipient_email VARCHAR(320) NOT NULL,
    send_at         TIMESTAMPTZ NOT NULL,
    status          VARCHAR(16) NOT NULL DEFAULT 'PENDING',
    attempts        INT NOT NULL DEFAULT 0,
    last_error      TEXT,
    sent_at         TIMESTAMPTZ,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT uk_event_reminder UNIQUE (event_id, user_id)
);

--changeset alex:2
CREATE INDEX idx_event_reminder_due ON event_reminder(send_at) WHERE status = 'PENDING';

--changeset alex:3
INSERT INTO event_reminder (event_id, user_id, recipient_email, send_at, status, attempts, created_at)
SELECT eu.event_id,
       eu.user_id,
       u.email,
       ((e.event_date::timestamp + e.start_time) AT TIME ZONE 'Europe/Moscow') - INTERVAL '24 hours',
       'PENDING',
       0,
       now()
FROM event_user eu
         JOIN event e ON e.id = eu.event_id
         JOIN users u ON u.id = eu.user_id
WHERE ((e.event_date::timestamp + e.start_time) AT TIME ZONE 'Europe/Moscow') > now() + INTERVAL '24 hours'
ON CONFLICT (event_id, user_id) DO NOTHING;
