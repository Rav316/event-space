package ru.alex.eventspaceapi.mapper.eventUser;

import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;
import ru.alex.eventspaceapi.dto.statistics.EventStatisticsDto;

import java.sql.ResultSet;
import java.sql.SQLException;

@Component
public class EventStatisticsMapper implements RowMapper<EventStatisticsDto> {
    @Override
    public EventStatisticsDto mapRow(ResultSet rs, int rowNum) throws SQLException {
        return new EventStatisticsDto(
                rs.getInt("upcoming_events"),
                rs.getInt("finished_events")
        );
    }
}
