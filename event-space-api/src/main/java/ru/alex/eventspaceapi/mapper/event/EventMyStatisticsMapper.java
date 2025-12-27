package ru.alex.eventspaceapi.mapper.event;

import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;
import ru.alex.eventspaceapi.dto.statistics.EventAuthorStatisticsDto;

import java.sql.ResultSet;
import java.sql.SQLException;

@Component
public class EventMyStatisticsMapper implements RowMapper<EventAuthorStatisticsDto> {
    @Override
    public EventAuthorStatisticsDto mapRow(ResultSet rs, int rowNum) throws SQLException {
        return new EventAuthorStatisticsDto(
                rs.getInt("events_count"),
                rs.getInt("participants_count")
        );
    }
}
