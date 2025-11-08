package ru.alex.eventspaceapi.database.repository.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Component;
import ru.alex.eventspaceapi.database.repository.EventCategoryRepositoryCustom;
import ru.alex.eventspaceapi.dto.eventCategory.EventCategoryReadDto;
import ru.alex.eventspaceapi.dto.statistics.CategoryStatisticsDto;

import java.util.List;

@Component
@RequiredArgsConstructor
public class EventCategoryRepositoryImpl implements EventCategoryRepositoryCustom {
    private final NamedParameterJdbcTemplate jdbcTemplate;

    @Override
    public CategoryStatisticsDto getCategoryStatistics(Integer userId) {
        String sqlCategoryDistribution = """
                SELECT c.id, c.name, COUNT(c.id) AS event_count
                FROM event_user eu
                JOIN event e ON eu.event_id = e.id
                JOIN event_category c ON e.event_category_id = c.id
                WHERE eu.user_id = :userId
                GROUP BY c.id
                """;
        String sqlCategoryActivity = """
                select
                    ec.id as category_id,
                    ec.name as category_name,
                    round(
                            case
                                when count(distinct e.id) = 0 then 0
                                else (
                                         (
                                             (count(distinct case when eu.attended then e.id end)::decimal / count(distinct e.id)) +
                                             (case
                                                  when count(distinct case when eu.attended then e.id end) = 0 then 0
                                                  else count(distinct er.event_id)::decimal /
                                                       count(distinct case when eu.attended then e.id end)
                                                 end)
                                             ) / 2
                                         ) * 100
                                end,
                            2
                    ) as activity_percent
                from event_category ec
                         left join event e
                                   on e.event_category_id = ec.id
                         left join event_user eu
                                   on eu.event_id = e.id and eu.user_id = :userId
                         left join event_review er
                                   on er.event_id = e.id and er.user_id = :userId
                group by ec.id, ec.name
                order by activity_percent desc;
                
                """;

        MapSqlParameterSource params = new MapSqlParameterSource()
                .addValue("userId", userId);

        List<CategoryStatisticsDto.CategoryDistributionDto> categoriesDistribution = jdbcTemplate.query(
                sqlCategoryDistribution,
                params,
                (rs, rowNum) -> new CategoryStatisticsDto.CategoryDistributionDto(
                        new EventCategoryReadDto(rs.getInt(1), rs.getString(2)),
                        rs.getInt(3)
                )
        );

        List<CategoryStatisticsDto.CategoryActivityDto> categoriesActivity = jdbcTemplate.query(
                sqlCategoryActivity,
                params,
                (rs, rowNum) -> new CategoryStatisticsDto.CategoryActivityDto(
                        new EventCategoryReadDto(rs.getInt(1), rs.getString(2)),
                        rs.getDouble(3)
                )
        );

        return new CategoryStatisticsDto(categoriesDistribution, categoriesActivity);
    }
}
