package ru.alex.eventspaceapi.database.repository.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.stereotype.Component;
import ru.alex.eventspaceapi.database.repository.EventUserRepositoryCustom;
import ru.alex.eventspaceapi.dto.statistics.EventStatisticsDto;
import ru.alex.eventspaceapi.dto.statistics.OverviewStatisticsDto;
import ru.alex.eventspaceapi.dto.statistics.UserStatisticsDto;
import ru.alex.eventspaceapi.mapper.eventUser.EventStatisticsMapper;
import ru.alex.eventspaceapi.mapper.eventUser.UserStatisticsMapper;

import java.util.List;
import java.util.Map;

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

    @Override
    public OverviewStatisticsDto getOverviewStatistics(Integer userId) {
        MapSqlParameterSource params = new MapSqlParameterSource()
                .addValue("userId", userId);

        String sqlMonthStats = """
            WITH last_6_months AS (
                SELECT
                    generate_series(
                        date_trunc('month', CURRENT_DATE) - interval '5 months',
                        date_trunc('month', CURRENT_DATE),
                        interval '1 month'
                    ) AS month_start
            )
            SELECT
                EXTRACT(MONTH FROM m.month_start)::int AS month,
                COALESCE(COUNT(DISTINCT e.id), 0) AS confirmed_events_count
            FROM last_6_months m
            LEFT JOIN event e
                ON date_trunc('month', e.event_date) = m.month_start
            LEFT JOIN event_user eu
                ON eu.event_id = e.id
               AND eu.confirmed_at IS NOT NULL
               AND eu.user_id = :userId
            GROUP BY m.month_start
            ORDER BY m.month_start
        """;


        String sqlDayOfWeekStats = """
            SELECT
                EXTRACT(ISODOW FROM e.event_date)::int AS day_of_week,
                COUNT(*) AS attended_events_count
            FROM event_user eu
            JOIN event e ON e.id = eu.event_id
            WHERE eu.user_id = :userId
              AND eu.attended = true
            GROUP BY 1
            ORDER BY 1
        """;

        String sqlAttendedEventsLastMonth = """
            SELECT COUNT(DISTINCT e.id) AS attended_events_last_month
            FROM event_user eu
            JOIN event e ON e.id = eu.event_id
            WHERE eu.user_id = :userId
              AND eu.attended = true
              AND e.event_date >= date_trunc('month', CURRENT_DATE) - interval '1 month'
              AND e.event_date < date_trunc('month', CURRENT_DATE)
        """;

        String sqlAvgAttendedEventsPerUserLastMonth = """
            SELECT
                ROUND(AVG(events_per_user), 2) AS avg_attended_events_per_user_last_month
            FROM (
                SELECT
                    COUNT(DISTINCT eu.event_id) AS events_per_user
                FROM event_user eu
                JOIN event e ON e.id = eu.event_id
                WHERE eu.attended = true
                  AND e.event_date >= date_trunc('month', CURRENT_DATE) - interval '1 month'
                  AND e.event_date < date_trunc('month', CURRENT_DATE)
                GROUP BY eu.user_id
            ) t
        """;

        String sqlUserReviewsLastMonth = """
            SELECT COUNT(*) AS user_reviews_last_month
            FROM event_review
            WHERE user_id = :userId
              AND created_at >= date_trunc('month', CURRENT_DATE) - interval '1 month'
              AND created_at < date_trunc('month', CURRENT_DATE)
        """;

        String sqlAvgReviewsPerUserLastMonth = """
            SELECT
                ROUND(AVG(reviews_per_user), 2) AS avg_reviews_per_user_last_month
            FROM (
                SELECT
                    user_id,
                    COUNT(*) AS reviews_per_user
                FROM event_review
                WHERE created_at >= date_trunc('month', CURRENT_DATE) - interval '1 month'
                  AND created_at < date_trunc('month', CURRENT_DATE)
                GROUP BY user_id
            ) t
        """;

        String sqlAvgUserRating = """
            SELECT ROUND(AVG(rating), 2) AS avg_user_rating
            FROM event_review
            WHERE user_id = :userId
        """;

        String sqlAvgSystemRating = """
            SELECT ROUND(AVG(rating), 2) AS avg_system_rating
            FROM event_review
        """;

        String sqlReviewsDynamicStatistics = """
                WITH last_6_months AS (
                    SELECT
                        generate_series(
                            date_trunc('month', CURRENT_DATE) - interval '5 months',
                            date_trunc('month', CURRENT_DATE),
                            interval '1 month'
                        ) AS month_start
                )
                SELECT
                    EXTRACT(MONTH FROM m.month_start)::int AS month,
                    COALESCE(COUNT(r.id), 0) AS reviews_count
                FROM last_6_months m
                LEFT JOIN event_review r
                    ON date_trunc('month', r.created_at) = m.month_start
                   AND r.user_id = :userId
                GROUP BY m.month_start
                ORDER BY m.month_start
        """;


        String sqlReviewsAvgRatingStatistics = """
                WITH last_6_months AS (
                    SELECT
                        generate_series(
                            date_trunc('month', CURRENT_DATE) - interval '5 months',
                            date_trunc('month', CURRENT_DATE),
                            interval '1 month'
                        ) AS month_start
                )
                SELECT
                    EXTRACT(MONTH FROM m.month_start)::int AS month,
                    ROUND(AVG(r.rating), 2) AS rating
                FROM last_6_months m
                LEFT JOIN event_review r
                    ON date_trunc('month', r.created_at) = m.month_start
                   AND r.user_id = :userId
                GROUP BY m.month_start
                ORDER BY m.month_start
        """;


        List<OverviewStatisticsDto.MonthEventStatisticsDto> monthStats = jdbcTemplate.query(
                sqlMonthStats,
                params,
                (rs, rowNum) -> new OverviewStatisticsDto.MonthEventStatisticsDto(
                        rs.getInt("month"),
                        rs.getInt("confirmed_events_count")
                )
        );

        List<OverviewStatisticsDto.DayOfWeekStatisticsDto> dayStats = jdbcTemplate.query(
                sqlDayOfWeekStats,
                params,
                (rs, rowNum) -> new OverviewStatisticsDto.DayOfWeekStatisticsDto(
                        rs.getInt("day_of_week"),
                        rs.getInt("attended_events_count")
                )
        );

        List<OverviewStatisticsDto.ReviewsDynamicStatisticsDto> reviewsDynamicStats = jdbcTemplate.query(
                sqlReviewsDynamicStatistics,
                params,
                (rs, rowNum) -> new OverviewStatisticsDto.ReviewsDynamicStatisticsDto(
                        rs.getInt("month"),
                        rs.getInt("reviews_count")
                )
        );

        List<OverviewStatisticsDto.ReviewsAvgRatingStatisticsDto> reviewsAvgRatingStats = jdbcTemplate.query(
                sqlReviewsAvgRatingStatistics,
                params,
                (rs, rowNum) -> new OverviewStatisticsDto.ReviewsAvgRatingStatisticsDto(
                        rs.getInt("month"),
                        rs.getDouble("rating")
                )
        );

        Integer attendedEventsLastMonth = jdbcTemplate.queryForObject(
                sqlAttendedEventsLastMonth, params, Integer.class
        );

        Double avgAttendedEventsPerUserLastMonth = jdbcTemplate.queryForObject(
                sqlAvgAttendedEventsPerUserLastMonth, Map.of(), Double.class
        );

        Integer reviewsLastMonth = jdbcTemplate.queryForObject(
                sqlUserReviewsLastMonth, params, Integer.class
        );

        Double avgReviewsPerUserLastMonth = jdbcTemplate.queryForObject(
                sqlAvgReviewsPerUserLastMonth, Map.of(), Double.class
        );

        Double avgRating = jdbcTemplate.queryForObject(
                sqlAvgUserRating, params, Double.class
        );

        Double avgRatingSystem = jdbcTemplate.queryForObject(
                sqlAvgSystemRating, Map.of(), Double.class
        );

        return new OverviewStatisticsDto(
                monthStats,
                dayStats,
                attendedEventsLastMonth,
                avgAttendedEventsPerUserLastMonth,
                reviewsLastMonth,
                avgReviewsPerUserLastMonth,
                avgRating,
                avgRatingSystem,
                reviewsDynamicStats,
                reviewsAvgRatingStats
        );
    }
}
