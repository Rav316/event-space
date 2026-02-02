package ru.alex.eventspaceapi.mapper.user;

import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;
import ru.alex.eventspaceapi.dto.user.TopOrganizerDto;

import java.sql.ResultSet;
import java.sql.SQLException;

@Component
public class TopOrganizerRowMapper implements RowMapper<TopOrganizerDto> {
    @Override
    public TopOrganizerDto mapRow(ResultSet rs, int rowNum) throws SQLException {
        return new TopOrganizerDto(
                rs.getInt("id"),
                rs.getString("first_name"),
                rs.getString("last_name"),
                rs.getString("avatar_url"),
                rs.getLong("events_count")
        );
    }
}
