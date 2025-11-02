package ru.alex.eventspaceapi.database.repository.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.stereotype.Component;
import ru.alex.eventspaceapi.database.repository.EventUserRepositoryCustom;
import ru.alex.eventspaceapi.dto.eventUser.EventStatisticsDto;
import ru.alex.eventspaceapi.dto.eventUser.UserStatisticsDto;
import ru.alex.eventspaceapi.mapper.eventUser.EventStatisticsMapper;
import ru.alex.eventspaceapi.mapper.eventUser.UserStatisticsMapper;

@Component
@RequiredArgsConstructor
public class EventUserRepositoryImpl implements EventUserRepositoryCustom {
    private final NamedParameterJdbcTemplate jdbcTemplate;
    private final EventStatisticsMapper eventStatisticsMapper;
    private final UserStatisticsMapper userStatisticsMapper;

    @Override
    public EventStatisticsDto getUserEventStatistics(Integer userId) {
        String sql = """
                SELECT
                    COUNT(CASE WHEN (e.event_date + e.end_time) < NOW() THEN 1 END) AS finished_events,
                    COUNT(CASE WHEN (e.event_date + e.end_time) >= NOW() THEN 1 END) AS upcoming_events
                FROM event_user eu
                JOIN event e ON eu.event_id = e.id
                WHERE eu.user_id = :userId
                """;
        SqlParameterSource params = new MapSqlParameterSource()
                .addValue("userId", userId);
        return jdbcTemplate.queryForObject(sql, params, eventStatisticsMapper);
    }

    @Override
    public UserStatisticsDto getUserStatistics(Integer userId) {
        String sql = """
                WITH
                user_events AS (
                   SELECT *
                   FROM event_user eu
                   WHERE eu.user_id = :userId
                ),
                user_reviews AS (
                   SELECT *
                   FROM event_review er
                   WHERE er.user_id = :userId
                ),
                events_stats AS (
                   SELECT
                       COUNT(*) FILTER (WHERE attended = true AND confirmed_at IS NOT NULL) AS total_events,
                       AVG(CASE WHEN attended = true THEN 1.0 ELSE 0 END) AS avg_attendance,
                
                       COUNT(*) FILTER (
                           WHERE date_trunc('month', registered_at) = date_trunc('month', now())
                             AND attended = true AND confirmed_at IS NOT NULL
                       ) AS events_this_month,
                
                       COUNT(*) FILTER (
                           WHERE date_trunc('month', registered_at) = date_trunc('month', now() - interval '1 month')
                             AND attended = true AND confirmed_at IS NOT NULL
                       ) AS events_prev_month,
                
                       AVG(CASE
                             WHEN date_trunc('month', registered_at) = date_trunc('month', now())
                             THEN (attended::int)
                           END) AS attendance_this_month,
                
                       AVG(CASE
                             WHEN date_trunc('month', registered_at) = date_trunc('month', now() - interval '1 month')
                             THEN (attended::int)
                           END) AS attendance_prev_month
                   FROM user_events
                ),
                reviews_stats AS (
                   SELECT
                       COUNT(id) AS total_reviews,
                       AVG(rating) AS avg_rating,
                
                       COUNT(*) FILTER (
                           WHERE date_trunc('month', created_at) = date_trunc('month', now())
                       ) AS reviews_this_month,
                
                       COUNT(*) FILTER (
                           WHERE date_trunc('month', created_at) = date_trunc('month', now() - interval '1 month')
                       ) AS reviews_prev_month,
                
                       AVG(CASE
                             WHEN date_trunc('month', created_at) = date_trunc('month', now())
                             THEN rating
                           END) AS avg_rating_this_month,
                
                       AVG(CASE
                             WHEN date_trunc('month', created_at) = date_trunc('month', now() - interval '1 month')
                             THEN rating
                           END) AS avg_rating_prev_month
                   FROM user_reviews
                )
                SELECT
                   e.total_events,
                   r.total_reviews AS reviews_left,
                   e.avg_attendance,
                   r.avg_rating AS avg_review_rating,
                   (e.events_this_month - e.events_prev_month) AS monthly_events_delta,
                   (r.reviews_this_month - r.reviews_prev_month) AS monthly_reviews_delta,
                   (e.attendance_this_month - e.attendance_prev_month) AS monthly_attendance_delta,
                   (r.avg_rating_this_month - r.avg_rating_prev_month) AS avg_rating_delta
                FROM events_stats e
                CROSS JOIN reviews_stats r;
                """;

        MapSqlParameterSource sqlParams = new MapSqlParameterSource()
                .addValue("userId", userId);
        return jdbcTemplate.queryForObject(sql, sqlParams, userStatisticsMapper);
    }
}
