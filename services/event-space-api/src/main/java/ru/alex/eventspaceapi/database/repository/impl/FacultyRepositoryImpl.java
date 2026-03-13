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
import ru.alex.eventspaceapi.database.entity.Faculty;
import ru.alex.eventspaceapi.database.repository.FacultyRepositoryCustom;
import ru.alex.eventspaceapi.dto.faculty.FacultyDeleteImpactDto;
import ru.alex.eventspaceapi.dto.filter.AdminListFilter;
import ru.alex.eventspaceapi.util.PageUtils;
import ru.alex.eventspaceapi.util.QueryDslUtils;

import java.util.List;
import java.util.Map;

import static ru.alex.eventspaceapi.database.entity.QFaculty.faculty;

@Component
@RequiredArgsConstructor
public class FacultyRepositoryImpl implements FacultyRepositoryCustom {
    private final JPAQueryFactory queryFactory;
    private final NamedParameterJdbcTemplate jdbcTemplate;

    private static final String SQL_DELETE_IMPACT = """
            SELECT COUNT(*) AS users FROM users WHERE faculty_id = :id
            """;

    private static final Map<String, ComparableExpressionBase<?>> SORT_BINDINGS = Map.of(
            "id", faculty.id,
            "name", faculty.name,
            "building", faculty.building.name
    );

    @Override
    public Page<Faculty> findAllByFilter(AdminListFilter filter, Sort sort) {
        int page = filter.page() != null && filter.page() > 0 ? filter.page() : 0;
        int requestedSize = filter.size() != null && filter.size() > 0 ? filter.size() : 15;
        int pageSize = PageUtils.getNearestPageSize(requestedSize);
        Pageable pageable = PageRequest.of(page, pageSize);

        BooleanExpression predicate = buildPredicate(filter);
        OrderSpecifier<?>[] sortOrder = QueryDslUtils.toOrderSpecifiers(sort, SORT_BINDINGS, faculty.id.desc());

        List<Faculty> faculties = queryFactory
                .selectFrom(faculty)
                .leftJoin(faculty.building).fetchJoin()
                .where(predicate)
                .orderBy(sortOrder)
                .limit(pageable.getPageSize())
                .offset(pageable.getOffset())
                .fetch();

        Long total = queryFactory
                .select(faculty.count())
                .from(faculty)
                .where(predicate)
                .fetchOne();

        return new PageImpl<>(faculties, pageable, total != null ? total : 0);
    }

    @Override
    public FacultyDeleteImpactDto getDeleteImpact(Integer id) {
        return jdbcTemplate.queryForObject(SQL_DELETE_IMPACT, Map.of("id", id), (rs, rowNum) ->
                new FacultyDeleteImpactDto(rs.getLong("users"))
        );
    }

    private BooleanExpression buildPredicate(AdminListFilter filter) {
        BooleanExpression predicate = Expressions.TRUE.isTrue();

        if (filter.search() != null && !filter.search().isBlank()) {
            predicate = predicate.and(
                    faculty.name.containsIgnoreCase(filter.search())
                            .or(faculty.building.name.containsIgnoreCase(filter.search()))
            );
        }

        return predicate;
    }
}
