package ru.alex.eventspaceapi.mapper.event;

import org.jspecify.annotations.Nullable;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;
import ru.alex.eventspaceapi.dto.event.EventCalendarDto;
import ru.alex.eventspaceapi.dto.eventCategory.EventCategoryReadDto;

import java.sql.ResultSet;
import java.sql.SQLException;

@Component
public class EventCalendarRowMapper implements RowMapper<EventCalendarDto> {
    @Override
    public @Nullable EventCalendarDto mapRow(ResultSet rs, int rowNum) throws SQLException {
        return new EventCalendarDto(
                rs.getInt("id"),
                rs.getString("name"),
                new EventCategoryReadDto(
                        rs.getInt("category_id"),
                        rs.getString("category_name"),
                        rs.getString("category_color")
                ),
                rs.getDate("event_date").toLocalDate(),
                rs.getTime("start_time").toLocalTime(),
                rs.getTime("end_time").toLocalTime()
        );
    }
}
