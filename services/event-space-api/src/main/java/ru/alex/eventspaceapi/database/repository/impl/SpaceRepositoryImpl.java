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
import org.springframework.stereotype.Component;
import ru.alex.eventspaceapi.database.entity.Space;
import ru.alex.eventspaceapi.database.repository.SpaceRepositoryCustom;
import ru.alex.eventspaceapi.dto.filter.AdminListFilter;
import ru.alex.eventspaceapi.dto.filter.SpaceFilter;
import ru.alex.eventspaceapi.util.PageUtils;
import ru.alex.eventspaceapi.util.QueryDslUtils;

import java.util.List;
import java.util.Map;

import static ru.alex.eventspaceapi.database.entity.QSpace.space;
import static ru.alex.eventspaceapi.database.entity.QSpaceType.spaceType;

@Component
@RequiredArgsConstructor
public class SpaceRepositoryImpl implements SpaceRepositoryCustom {
    private final JPAQueryFactory queryFactory;

    private static final Map<String, ComparableExpressionBase<?>> SORT_BINDINGS = Map.of(
            "id", space.id,
            "name", space.name,
            "floor", space.floor,
            "capacity", space.capacity,
            "building", space.building.name,
            "type", space.type.name
    );

    @Override
    public List<Space> findAllByFilter(SpaceFilter filter) {
        return queryFactory.select(space)
                .from(space)
                .leftJoin(space.type, spaceType).fetchJoin()
                .where(buildPredicate(filter))
                .orderBy(space.name.asc())
                .fetch();
    }

    @Override
    public Page<Space> findAllByFilter(AdminListFilter filter, Sort sort) {
        int page = filter.page() != null && filter.page() > 0 ? filter.page() : 0;
        int requestedSize = filter.size() != null && filter.size() > 0 ? filter.size() : 15;
        int pageSize = PageUtils.getNearestPageSize(requestedSize);
        Pageable pageable = PageRequest.of(page, pageSize);

        BooleanExpression predicate = buildAdminPredicate(filter);
        OrderSpecifier<?>[] sortOrder = QueryDslUtils.toOrderSpecifiers(sort, SORT_BINDINGS, space.id.desc());

        List<Space> spaces = queryFactory
                .selectFrom(space)
                .leftJoin(space.building).fetchJoin()
                .leftJoin(space.type, spaceType).fetchJoin()
                .where(predicate)
                .orderBy(sortOrder)
                .limit(pageable.getPageSize())
                .offset(pageable.getOffset())
                .fetch();

        Long total = queryFactory
                .select(space.count())
                .from(space)
                .where(predicate)
                .fetchOne();

        return new PageImpl<>(spaces, pageable, total != null ? total : 0);
    }

    private BooleanExpression buildAdminPredicate(AdminListFilter filter) {
        BooleanExpression predicate = Expressions.TRUE.isTrue();

        if (filter.search() != null && !filter.search().isBlank()) {
            predicate = predicate.and(
                    space.name.containsIgnoreCase(filter.search())
                            .or(space.building.name.containsIgnoreCase(filter.search()))
                            .or(space.building.address.containsIgnoreCase(filter.search()))
                            .or(space.type.name.containsIgnoreCase(filter.search()))
            );
        }

        return predicate;
    }

    private BooleanExpression buildPredicate(SpaceFilter filter) {
        BooleanExpression predicate = Expressions.TRUE.isTrue();
        predicate = predicate.and(space.building.id.eq(filter.building()));
        if(filter.name() != null && !filter.name().isBlank()) {
            predicate = predicate.and(space.name.containsIgnoreCase(filter.name()));
        }
        if(filter.type() != null) {
            predicate = predicate.and(space.type.id.eq(filter.type()));
        }
        if(filter.minCapacity() != null) {
            predicate = predicate.and(space.capacity.goe(filter.minCapacity()));
        }
        if(filter.maxCapacity() != null) {
            predicate = predicate.and(space.capacity.loe(filter.maxCapacity()));
        }
        return predicate;
    }
}
