package ru.alex.eventspaceapi.database.repository.impl;

import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.ComparableExpressionBase;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.core.types.dsl.StringExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Component;
import ru.alex.eventspaceapi.database.entity.User;
import ru.alex.eventspaceapi.database.repository.UserRepositoryCustom;
import ru.alex.eventspaceapi.dto.filter.AdminListFilter;
import ru.alex.eventspaceapi.dto.user.TopOrganizerDto;
import ru.alex.eventspaceapi.mapper.user.TopOrganizerRowMapper;
import ru.alex.eventspaceapi.util.PageUtils;
import ru.alex.eventspaceapi.util.QueryDslUtils;

import java.util.Collections;
import java.util.List;
import java.util.Map;

import static ru.alex.eventspaceapi.database.entity.QUser.user;

@Component
@RequiredArgsConstructor
public class UserRepositoryImpl implements UserRepositoryCustom {
    private final JPAQueryFactory queryFactory;
    private final NamedParameterJdbcTemplate jdbcTemplate;
    private final TopOrganizerRowMapper topOrganizerRowMapper;

    private static final Map<String, ComparableExpressionBase<?>> SORT_BINDINGS;

    static {
        StringExpression fullName = Expressions.stringTemplate(
                "concat({0}, ' ', {1})",
                user.firstName,
                user.lastName
        );
        SORT_BINDINGS = Map.of(
                "id", user.id,
                "fullName", fullName,
                "role", user.role,
                "faculty", user.faculty.name,
                "status", user.active
        );
    }

    @Override
    public Page<User> findAll(AdminListFilter filter, Sort sort) {
        int page = filter.page() != null && filter.page() > 0 ? filter.page() : 0;
        int requestedSize = filter.size() != null && filter.size() > 0 ? filter.size() : 15;
        int pageSize = PageUtils.getNearestPageSize(requestedSize);
        Pageable pageable = PageRequest.of(page, pageSize);

        BooleanExpression predicate = buildPredicate(filter);
        OrderSpecifier<?>[] sortOrder = QueryDslUtils.toOrderSpecifiers(sort, SORT_BINDINGS, user.id.desc());

        List<User> users = queryFactory
                .selectFrom(user)
                .leftJoin(user.faculty).fetchJoin()
                .where(predicate)
                .orderBy(sortOrder)
                .limit(pageable.getPageSize())
                .offset(pageable.getOffset())
                .fetch();

        Long total = queryFactory
                .select(user.count())
                .from(user)
                .where(predicate)
                .fetchOne();

        return new PageImpl<>(
                users,
                pageable,
                total != null ? total : 0
        );
    }

    @Override
    public List<TopOrganizerDto> getTopOrganizers() {
        String sql = """
                SELECT
                    u.id,
                    u.first_name,
                    u.last_name,
                    u.avatar_url,
                    COUNT(DISTINCT e.id) AS events_count,
                    ROUND(AVG(er.rating)::numeric, 1) AS avg_rating
                FROM users u
                JOIN event e ON e.author = u.id
                LEFT JOIN event_review er ON er.event_id = e.id
                WHERE u.is_active = true
                GROUP BY u.id, u.first_name, u.last_name, u.avatar_url
                HAVING COUNT(DISTINCT e.id) > 0
                ORDER BY events_count DESC
                LIMIT 6
                """;

        return jdbcTemplate.query(sql, Collections.emptyMap(), topOrganizerRowMapper);
    }

    private BooleanExpression buildPredicate(AdminListFilter filter) {
        BooleanExpression predicate = Expressions.TRUE.isTrue();

        if (filter.search() != null && !filter.search().isBlank()) {
            predicate = predicate.and(user
                    .firstName.containsIgnoreCase(filter.search())
                    .or(user.lastName.containsIgnoreCase(filter.search()))
                    .or(user.faculty.name.contains(filter.search()))
                    .or(user.email.containsIgnoreCase(filter.search()))
            );
        }

        return predicate;
    }
}
