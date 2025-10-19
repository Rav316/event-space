package ru.alex.eventspaceapi.mapper.eventReview;

import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;
import ru.alex.eventspaceapi.dto.eventReview.EventReviewStatisticsDto;

import java.math.BigDecimal;
import java.sql.ResultSet;
import java.sql.SQLException;

@Component
public class EventReviewStatisticsMapper implements RowMapper<EventReviewStatisticsDto> {
    @Override
    public EventReviewStatisticsDto mapRow(ResultSet rs, int rowNum) throws SQLException {
        BigDecimal avg = rs.getBigDecimal("avg_rating");
        Float avgRating = avg != null ? avg.floatValue() : 0;
        return new EventReviewStatisticsDto(
                avgRating,
                rs.getInt("five_stars"),
                rs.getInt("four_stars"),
                rs.getInt("three_stars"),
                rs.getInt("two_stars"),
                rs.getInt("one_star"),
                rs.getInt("total_reviews")
        );
    }
}
