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
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Component;
import ru.alex.eventspaceapi.dto.building.BuildingDeleteImpactDto;
import ru.alex.eventspaceapi.database.entity.Building;
import ru.alex.eventspaceapi.database.repository.BuildingRepositoryCustom;
import ru.alex.eventspaceapi.dto.filter.AdminListFilter;
import ru.alex.eventspaceapi.util.PageUtils;
import ru.alex.eventspaceapi.util.QueryDslUtils;

import java.util.List;
import java.util.Map;

import static ru.alex.eventspaceapi.database.entity.QBuilding.building;

@Component
@RequiredArgsConstructor
public class BuildingRepositoryImpl implements BuildingRepositoryCustom {
    private final JPAQueryFactory queryFactory;
    private final NamedParameterJdbcTemplate jdbcTemplate;

    private static final String SQL_DELETE_IMPACT = """
            SELECT
                (SELECT COUNT(*) FROM faculty WHERE building_id = :id)                                          AS faculties,
                (SELECT COUNT(*) FROM users u JOIN faculty f ON u.faculty_id = f.id WHERE f.building_id = :id) AS users,
                (SELECT COUNT(*) FROM space WHERE building_id = :id)                                           AS spaces,
                (SELECT COUNT(*) FROM event e JOIN space s ON e.space_id = s.id WHERE s.building_id = :id)     AS events
            """;

    private static final Map<String, ComparableExpressionBase<?>> SORT_BINDINGS = Map.of(
            "id", building.id,
            "name", building.name,
            "address", building.address
    );

    @Override
    public Page<Building> findAllByFilter(AdminListFilter filter, Sort sort) {
        int page = filter.page() != null && filter.page() > 0 ? filter.page() : 0;
        int requestedSize = filter.size() != null && filter.size() > 0 ? filter.size() : 15;
        int pageSize = PageUtils.getNearestPageSize(requestedSize);
        Pageable pageable = PageRequest.of(page, pageSize);

        BooleanExpression predicate = buildPredicate(filter);
        OrderSpecifier<?>[] sortOrder = QueryDslUtils.toOrderSpecifiers(sort, SORT_BINDINGS, building.id.desc());

        List<Building> buildings = queryFactory
                .selectFrom(building)
                .where(predicate)
                .orderBy(sortOrder)
                .limit(pageable.getPageSize())
                .offset(pageable.getOffset())
                .fetch();

        Long total = queryFactory
                .select(building.count())
                .from(building)
                .where(predicate)
                .fetchOne();

        return new PageImpl<>(buildings, pageable, total != null ? total : 0);
    }

    @Override
    public BuildingDeleteImpactDto getDeleteImpact(Integer id) {
        return jdbcTemplate.queryForObject(SQL_DELETE_IMPACT, Map.of("id", id), (rs, rowNum) ->
                new BuildingDeleteImpactDto(
                        rs.getLong("faculties"),
                        rs.getLong("users"),
                        rs.getLong("spaces"),
                        rs.getLong("events")
                )
        );
    }

    private BooleanExpression buildPredicate(AdminListFilter filter) {
        BooleanExpression predicate = Expressions.TRUE.isTrue();

        if (filter.search() != null && !filter.search().isBlank()) {
            predicate = predicate.and(
                    building.name.containsIgnoreCase(filter.search())
                            .or(building.address.containsIgnoreCase(filter.search()))
            );
        }

        return predicate;
    }
}
