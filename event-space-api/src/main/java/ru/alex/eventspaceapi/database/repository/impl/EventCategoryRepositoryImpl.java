package ru.alex.eventspaceapi.database.repository.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Component;
import ru.alex.eventspaceapi.database.repository.EventCategoryRepositoryCustom;
import ru.alex.eventspaceapi.dto.statistics.CategoryStatisticsDto;
import ru.alex.eventspaceapi.mapper.statistics.CategoryStatisticsMapper;

import java.util.List;

@Component
@RequiredArgsConstructor
public class EventCategoryRepositoryImpl implements EventCategoryRepositoryCustom {
    private final NamedParameterJdbcTemplate jdbcTemplate;
    private final CategoryStatisticsMapper categoryStatisticsMapper;

    @Override
    public List<CategoryStatisticsDto> getCategoryStatistics(Integer userId) {
        String sql = """
                SELECT c.id, c.name, COUNT(c.id) AS event_count
                FROM event_user eu
                JOIN event e ON eu.event_id = e.id
                JOIN event_category c ON e.event_category_id = c.id
                WHERE eu.user_id = :userId
                GROUP BY c.id
                """;
        MapSqlParameterSource params = new MapSqlParameterSource()
                .addValue("userId", userId);

        return jdbcTemplate.query(sql, params, categoryStatisticsMapper);
    }
}
