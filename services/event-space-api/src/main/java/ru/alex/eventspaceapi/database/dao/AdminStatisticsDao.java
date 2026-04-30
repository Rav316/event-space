package ru.alex.eventspaceapi.database.dao;

import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;
import ru.alex.eventspaceapi.dto.statistics.AdminStatisticsDto;

import java.util.List;
import java.util.Map;

@Repository
@RequiredArgsConstructor
public class AdminStatisticsDao {

    private final NamedParameterJdbcTemplate jdbcTemplate;

    private static final String SQL_COUNTS = """
            SELECT
                (SELECT COUNT(*) FROM users)                                         AS total_users,
                (SELECT COUNT(*) FROM users WHERE is_active = true)                 AS active_users,
                (SELECT COUNT(*) FROM event)                                         AS total_events,
                (SELECT COUNT(*) FROM event
                  WHERE event_date > CURRENT_DATE
                     OR (event_date = CURRENT_DATE AND start_time > CURRENT_TIME))   AS active_events,
                (SELECT COUNT(*) FROM complaint WHERE status = 'UNDER_CONSIDERATION') AS pending_complaints
            """;

    private static final String SQL_LATEST_USERS = """
            SELECT id, first_name, last_name, avatar_url, is_active
            FROM users
            ORDER BY register_date DESC, id DESC
            LIMIT 3
            """;

    private static final String SQL_LATEST_ACTIVE_EVENTS = """
            SELECT e.id, e.name, e.event_date, e.participant_quantity,
                   COUNT(eu.id)  AS registered_count,
                   u.first_name  AS author_first_name,
                   u.last_name   AS author_last_name
            FROM event e
            JOIN users u ON u.id = e.author
            LEFT JOIN event_user eu ON eu.event_id = e.id
            WHERE e.event_date > CURRENT_DATE
               OR (e.event_date = CURRENT_DATE AND e.start_time > CURRENT_TIME)
            GROUP BY e.id, e.name, e.event_date, e.participant_quantity, u.first_name, u.last_name
            ORDER BY e.id DESC
            LIMIT 3
            """;

    public AdminStatisticsDto getAdminStatistics() {
        long[] counts = jdbcTemplate.queryForObject(SQL_COUNTS, Map.of(), (rs, rowNum) ->
                new long[]{
                        rs.getLong("total_users"),
                        rs.getLong("active_users"),
                        rs.getLong("total_events"),
                        rs.getLong("active_events"),
                        rs.getLong("pending_complaints")
                }
        );

        List<AdminStatisticsDto.UserPreviewDto> latestUsers = jdbcTemplate.query(
                SQL_LATEST_USERS, Map.of(),
                (rs, rowNum) -> new AdminStatisticsDto.UserPreviewDto(
                        rs.getInt("id"),
                        rs.getString("first_name"),
                        rs.getString("last_name"),
                        rs.getString("avatar_url"),
                        rs.getBoolean("is_active")
                )
        );

        List<AdminStatisticsDto.EventPreviewDto> latestActiveEvents = jdbcTemplate.query(
                SQL_LATEST_ACTIVE_EVENTS, Map.of(),
                (rs, rowNum) -> new AdminStatisticsDto.EventPreviewDto(
                        rs.getInt("id"),
                        rs.getString("name"),
                        rs.getDate("event_date").toLocalDate(),
                        rs.getInt("participant_quantity"),
                        rs.getLong("registered_count"),
                        rs.getString("author_first_name"),
                        rs.getString("author_last_name")
                )
        );

        return new AdminStatisticsDto(
                counts[0], counts[1], counts[2], counts[3], counts[4],
                latestUsers,
                latestActiveEvents
        );
    }
}
