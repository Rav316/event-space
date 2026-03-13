package ru.alex.eventspaceapi.database.repository.impl;

import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.ComparableExpressionBase;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Component;
import ru.alex.eventspaceapi.database.entity.EventCategory;
import ru.alex.eventspaceapi.database.repository.EventCategoryRepositoryCustom;
import ru.alex.eventspaceapi.dto.eventCategory.EventCategoryDeleteImpactDto;
import ru.alex.eventspaceapi.dto.eventCategory.EventCategoryReadDto;
import ru.alex.eventspaceapi.dto.filter.AdminListFilter;
import ru.alex.eventspaceapi.dto.statistics.CategoryStatisticsDto;
import ru.alex.eventspaceapi.util.PageUtils;
import ru.alex.eventspaceapi.util.QueryDslUtils;

import java.util.List;
import java.util.Map;

import static ru.alex.eventspaceapi.database.entity.QEventCategory.eventCategory;

@Component
@RequiredArgsConstructor
public class EventCategoryRepositoryImpl implements EventCategoryRepositoryCustom {
    private final JPAQueryFactory queryFactory;
    private final NamedParameterJdbcTemplate jdbcTemplate;

    private static final String SQL_DELETE_IMPACT = """
            SELECT
                (SELECT COUNT(*) FROM event WHERE event_category_id = :id)                                     AS events,
                (SELECT COUNT(*) FROM event_review er JOIN event e ON er.event_id = e.id WHERE e.event_category_id = :id) AS reviews
            """;

    private static final Map<String, ComparableExpressionBase<?>> SORT_BINDINGS = Map.of(
            "id", eventCategory.id,
            "name", eventCategory.name
    );

    @Override
    public Page<EventCategory> findAllByFilter(AdminListFilter filter, Sort sort) {
        int page = filter.page() != null && filter.page() > 0 ? filter.page() : 0;
        int requestedSize = filter.size() != null && filter.size() > 0 ? filter.size() : 15;
        int pageSize = PageUtils.getNearestPageSize(requestedSize);
        Pageable pageable = PageRequest.of(page, pageSize);

        BooleanExpression predicate = buildPredicate(filter);
        OrderSpecifier<?>[] sortOrder = QueryDslUtils.toOrderSpecifiers(sort, SORT_BINDINGS, eventCategory.id.desc());

        List<EventCategory> categories = queryFactory
                .selectFrom(eventCategory)
                .where(predicate)
                .orderBy(sortOrder)
                .limit(pageable.getPageSize())
                .offset(pageable.getOffset())
                .fetch();

        Long total = queryFactory
                .select(eventCategory.count())
                .from(eventCategory)
                .where(predicate)
                .fetchOne();

        return new PageImpl<>(categories, pageable, total != null ? total : 0);
    }

    private BooleanExpression buildPredicate(AdminListFilter filter) {
        BooleanExpression predicate = Expressions.TRUE.isTrue();

        if (filter.search() != null && !filter.search().isBlank()) {
            predicate = predicate.and(eventCategory.name.containsIgnoreCase(filter.search()));
        }

        return predicate;
    }

    @Override
    public EventCategoryDeleteImpactDto getDeleteImpact(Integer id) {
        return jdbcTemplate.queryForObject(SQL_DELETE_IMPACT, Map.of("id", id), (rs, rowNum) ->
                new EventCategoryDeleteImpactDto(
                        rs.getLong("events"),
                        rs.getLong("reviews")
                )
        );
    }

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
