package ru.alex.eventspaceapi.mapper.eventUser;

import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;
import ru.alex.eventspaceapi.dto.statistics.UserStatisticsDto;

import java.sql.ResultSet;
import java.sql.SQLException;

@Component
public class UserStatisticsMapper implements RowMapper<UserStatisticsDto> {
    @Override
    public UserStatisticsDto mapRow(ResultSet rs, int rowNum) throws SQLException {
        return new UserStatisticsDto(
                rs.getInt("total_events"),
                rs.getInt("reviews_left"),
                rs.getDouble("avg_attendance"),
                rs.getDouble("avg_review_rating"),
                rs.getInt("monthly_events_delta"),
                rs.getInt("monthly_reviews_delta"),
                rs.getDouble("monthly_attendance_delta"),
                rs.getDouble("avg_rating_delta")
        );
    }
}
