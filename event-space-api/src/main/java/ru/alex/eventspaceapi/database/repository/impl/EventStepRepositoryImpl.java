package ru.alex.eventspaceapi.database.repository.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.stereotype.Component;
import ru.alex.eventspaceapi.database.entity.EventStep;
import ru.alex.eventspaceapi.database.repository.EventStepRepositoryCustom;

import java.util.List;

@Component
@RequiredArgsConstructor
public class EventStepRepositoryImpl implements EventStepRepositoryCustom {
    private final NamedParameterJdbcTemplate jdbcTemplate;

    public void insertEventStepsBatch(List<EventStep> steps) {
        String sql = """
            INSERT INTO event_step (name, start_time, end_time, description, event_id)
            VALUES (:name, :startTime, :endTime, :description, :eventId)
            """;

        SqlParameterSource[] batchParams = steps.stream()
                .map(step -> new MapSqlParameterSource()
                        .addValue("name", step.getName())
                        .addValue("startTime", step.getStartTime())
                        .addValue("endTime", step.getEndTime())
                        .addValue("description", step.getDescription())
                        .addValue("eventId", step.getEvent().getId()))
                .toArray(SqlParameterSource[]::new);

        jdbcTemplate.batchUpdate(sql, batchParams);
    }
}
