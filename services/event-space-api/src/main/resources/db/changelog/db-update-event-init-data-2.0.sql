--liquibase formatted sql

--changeset codex:1
WITH seeded_events AS (
    SELECT e.id, e.event_date, s.capacity
    FROM event e
    JOIN users author_u ON author_u.id = e.author
    JOIN space s ON s.id = e.space_id
    WHERE author_u.email LIKE 'org%@eventspace.local'
      AND e.event_date >= DATE '2026-03-25'
      AND e.event_date <= DATE '2026-05-31'
),
ranked_attendees AS (
    SELECT
        eu.event_id,
        eu.user_id,
        se.event_date,
        se.capacity,
        ROW_NUMBER() OVER (
            PARTITION BY eu.event_id
            ORDER BY md5(eu.event_id::text || ':' || eu.user_id::text)
        ) AS rn
    FROM event_user eu
    JOIN seeded_events se ON se.id = eu.event_id
    WHERE eu.attended = false
),
verifiers AS (
    SELECT
        u.id,
        ROW_NUMBER() OVER (ORDER BY u.id) AS rn
    FROM users u
    WHERE u.role = 'VERIFIER' AND u.is_active = true
),
to_attend AS (
    SELECT
        ra.event_id,
        ra.user_id,
        ra.event_date,
        ra.rn,
        GREATEST(5, LEAST(ra.capacity - 5, 24)) AS attended_limit
    FROM ranked_attendees ra
)
UPDATE event_user eu
SET attended = true,
    confirmed_by = (
        SELECT v.id
        FROM verifiers v
        ORDER BY abs(v.rn - ((eu.event_id + eu.user_id) % 3 + 1))
        LIMIT 1
    ),
    confirmed_at = ((ta.event_date::timestamp + interval '1 hour') + ((ta.rn % 100)::text || ' minutes')::interval) AT TIME ZONE 'Europe/Moscow'
FROM to_attend ta
WHERE eu.event_id = ta.event_id
  AND eu.user_id = ta.user_id
  AND ta.rn <= ta.attended_limit;

--changeset codex:2
WITH seeded_attended_events AS (
    SELECT e.id, e.name, e.event_date, e.end_time
    FROM event e
    JOIN users author_u ON author_u.id = e.author
    WHERE author_u.email LIKE 'org%@eventspace.local'
      AND e.event_date >= DATE '2026-03-25'
      AND e.event_date <= DATE '2026-05-31'
),
attended AS (
    SELECT
        eu.event_id,
        eu.user_id,
        sae.name,
        sae.event_date,
        sae.end_time,
        ROW_NUMBER() OVER (
            PARTITION BY eu.event_id
            ORDER BY eu.confirmed_at NULLS LAST, eu.user_id
        ) AS rn,
        COUNT(*) OVER (PARTITION BY eu.event_id) AS total_attended
    FROM event_user eu
    JOIN seeded_attended_events sae ON sae.id = eu.event_id
    WHERE eu.attended = true
),
scored_reviews AS (
    SELECT
        a.*,
        GREATEST(4, LEAST(12, a.total_attended / 2)) AS review_limit,
        CASE
            WHEN a.rn % 20 < 9 THEN 5
            WHEN a.rn % 20 < 15 THEN 4
            WHEN a.rn % 20 < 18 THEN 3
            WHEN a.rn % 20 = 18 THEN 2
            ELSE 1
        END AS rating
    FROM attended a
)
INSERT INTO event_review (user_id, event_id, title, content, rating, created_at)
SELECT
    sr.user_id,
    sr.event_id,
    LEFT('Отзыв: ' || sr.name, 128),
    CASE
        WHEN sr.rating = 5 THEN 'Отличная организация, тайминг выдержан, формат оказался очень полезным.'
        WHEN sr.rating = 4 THEN 'Сильная программа и спикеры, хотелось бы чуть больше времени на вопросы.'
        WHEN sr.rating = 3 THEN 'Мероприятие полезное, но часть блоков показалась слишком быстрой.'
        WHEN sr.rating = 2 THEN 'Тема интересная, но не хватило структуры и практических примеров.'
        ELSE 'Ожидания не совпали с форматом, хотелось более глубокую проработку.'
    END,
    sr.rating,
    ((sr.event_date::timestamp + sr.end_time) + ((sr.rn % 72 + 1)::text || ' hours')::interval) AT TIME ZONE 'Europe/Moscow'
FROM scored_reviews sr
WHERE sr.rn <= sr.review_limit
ON CONFLICT (event_id, user_id) DO NOTHING;

--changeset codex:3
WITH seeded_reviews AS (
    SELECT er.id, er.user_id, er.created_at
    FROM event_review er
    JOIN event e ON e.id = er.event_id
    JOIN users author_u ON author_u.id = e.author
    WHERE author_u.email LIKE 'org%@eventspace.local'
      AND e.event_date >= DATE '2026-03-25'
      AND e.event_date <= DATE '2026-05-31'
),
candidates AS (
    SELECT
        sr.id AS review_id,
        u.id AS user_id,
        sr.created_at,
        ROW_NUMBER() OVER (
            PARTITION BY sr.id
            ORDER BY md5(sr.id::text || ':' || u.id::text)
        ) AS rn,
        (2 + (sr.id % 7)) AS mark_limit
    FROM seeded_reviews sr
    JOIN users u ON u.is_active = true AND u.id <> sr.user_id
)
INSERT INTO helpful_mark (user_id, review_id, created_at)
SELECT
    c.user_id,
    c.review_id,
    c.created_at + ((c.rn % 30)::text || ' minutes')::interval
FROM candidates c
WHERE c.rn <= c.mark_limit
ON CONFLICT (user_id, review_id) DO NOTHING;
