package ru.alex.eventspaceapi.database.repository.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.stereotype.Component;
import ru.alex.eventspaceapi.database.repository.EventUserRepositoryCustom;
import ru.alex.eventspaceapi.dto.event.EventStatisticsDto;
import ru.alex.eventspaceapi.mapper.event.EventStatisticsMapper;

@Component
@RequiredArgsConstructor
public class EventUserRepositoryImpl implements EventUserRepositoryCustom {
    private final NamedParameterJdbcTemplate jdbcTemplate;
    private final EventStatisticsMapper eventStatisticsMapper;

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
}
