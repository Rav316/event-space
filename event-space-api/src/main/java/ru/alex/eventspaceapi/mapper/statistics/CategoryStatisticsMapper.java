package ru.alex.eventspaceapi.mapper.statistics;

import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;
import ru.alex.eventspaceapi.dto.eventCategory.EventCategoryReadDto;
import ru.alex.eventspaceapi.dto.statistics.CategoryStatisticsDto;

import java.sql.ResultSet;
import java.sql.SQLException;

@Component
public class CategoryStatisticsMapper implements RowMapper<CategoryStatisticsDto> {

    @Override
    public CategoryStatisticsDto mapRow(ResultSet rs, int rowNum) throws SQLException {
        return new CategoryStatisticsDto(
                new EventCategoryReadDto(
                        rs.getInt(1),
                        rs.getString(2)
                ),
                rs.getInt(3)
        );
    }
}
