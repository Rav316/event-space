package ru.alex.eventspaceapi.database.repository.impl;

import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Component;
import ru.alex.eventspaceapi.database.entity.Event;
import ru.alex.eventspaceapi.database.repository.EventRepositoryCustom;
import ru.alex.eventspaceapi.dto.filter.EventFilter;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import static ru.alex.eventspaceapi.database.entity.QBuilding.building;
import static ru.alex.eventspaceapi.database.entity.QEvent.event;
import static ru.alex.eventspaceapi.database.entity.QEventCategory.eventCategory;
import static ru.alex.eventspaceapi.database.entity.QSpace.space;
import static ru.alex.eventspaceapi.database.entity.QUser.user;

@Component
@RequiredArgsConstructor
public class EventRepositoryImpl implements EventRepositoryCustom {
    private final JPAQueryFactory queryFactory;

    @Override
    public Page<Event> findAllEventsByFilter(EventFilter filter) {
        BooleanExpression predicate = buildPredicate(filter);
        int pageSize = 9;
        int page = filter.page() != null ? filter.page() : 0;
        List<Event> events = queryFactory.select(event)
                .from(event)
                .leftJoin(event.users, user).fetchJoin()
                .leftJoin(event.category, eventCategory).fetchJoin()
                .leftJoin(event.space, space).fetchJoin()
                .leftJoin(space.building, building).fetchJoin()
                .where(predicate)
                .orderBy(getSortOrder(filter))
                .limit(pageSize)
                .offset(page)
                .fetch();

        Long total = queryFactory
                .select(event.count())
                .from(event)
                .where(predicate)
                .fetchOne();
        return new PageImpl<>(events, PageRequest.of(page, pageSize), Objects.requireNonNull(total));
    }

    private BooleanExpression buildPredicate(EventFilter filter) {
        BooleanExpression predicate = Expressions.TRUE.isTrue();

        if (filter.name() != null && !filter.name().isBlank()) {
            predicate = predicate.and(event.name.eq(filter.name()));
        }

        if (filter.categories() != null && !filter.categories().isEmpty()) {
            predicate = predicate.and(event.category.id.in(filter.categories()));
        }
        if (filter.tags() != null && !filter.tags().isEmpty()) {
            String[] tagsArray = filter.tags().toArray(new String[0]);
            BooleanExpression tagsContainsAll =
                    Expressions.booleanTemplate(
                            "array_contains_all({0}, {1})",
                            event.tags,
                            Expressions.constant(tagsArray)
                    );
            predicate = predicate.and(tagsContainsAll);
        }
        if (filter.hasPlaces() != null && filter.hasPlaces()) {
            predicate = predicate.and(event.users.size().lt(event.space.capacity));
        }

        return predicate;
    }

    private OrderSpecifier<?>[] getSortOrder(EventFilter filter) {
        List<OrderSpecifier<?>> orderSpecifiers = new ArrayList<>();

        if (filter.sort() != null) {
            switch (filter.sort()) {
                case "date":
                    orderSpecifiers.add(event.eventDate.asc());
                    orderSpecifiers.add(event.startTime.asc());
                    break;
                case "popularity":
                    orderSpecifiers.add(event.users.size().asc());
                    break;
                case "availability":
                    orderSpecifiers.add(event.users.size().desc());
                    break;
                case "alphabet":
                    orderSpecifiers.add(event.name.desc());
                    break;
            }
        }
        orderSpecifiers.add(event.id.desc());
        return orderSpecifiers.toArray(new OrderSpecifier[0]);
    }
}
