package ru.alex.eventspaceapi.database.repository.impl;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import ru.alex.eventspaceapi.database.entity.Space;
import ru.alex.eventspaceapi.database.repository.SpaceRepositoryCustom;
import ru.alex.eventspaceapi.dto.filter.SpaceFilter;
import ru.alex.eventspaceapi.dto.space.SpaceListDto;

import java.util.List;

import static ru.alex.eventspaceapi.database.entity.QSpace.space;
import static ru.alex.eventspaceapi.database.entity.QSpaceType.spaceType;

@Component
@RequiredArgsConstructor
public class SpaceRepositoryImpl implements SpaceRepositoryCustom {
    private final JPAQueryFactory queryFactory;

    @Override
    public List<SpaceListDto> findAllByFilter(SpaceFilter filter) {
        List<Space> spaces = queryFactory.select(space)
                .from(space)
                .leftJoin(space.type, spaceType).fetchJoin()
                .where(buildPredicate(filter))
                .orderBy(space.name.asc())
                .fetch();
        return spaces.stream()
                .map(space -> new SpaceListDto(
                        space.getId(),
                        space.getName(),
                        space.getType().getName(),
                        space.getFloor(),
                        space.getCapacity()
                )).toList();
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
