package ru.alex.eventspaceapi.database.repository.impl;

import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Component;
import ru.alex.eventspaceapi.database.entity.QEventUser;
import ru.alex.eventspaceapi.database.repository.EventRepositoryCustom;
import ru.alex.eventspaceapi.dto.eventCategory.EventCategoryReadDto;
import ru.alex.eventspaceapi.dto.building.BuildingReadDto;
import ru.alex.eventspaceapi.dto.event.EventListDto;
import ru.alex.eventspaceapi.dto.filter.EventFilter;
import ru.alex.eventspaceapi.dto.space.SpaceReadDto;

import java.time.LocalDate;
import java.time.LocalTime;
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
    public Page<EventListDto> findAllEventsByFilter(Integer userId, EventFilter filter) {
        BooleanExpression predicate = buildPredicate(filter);
        int pageSize = 9;
        int page = filter.page() != null ? filter.page() : 0;

        QEventUser eventUserForJoin = new QEventUser("eventUserForJoin");

        LocalDate dateNow = LocalDate.now();
        LocalTime timeNow = LocalTime.now();

        BooleanExpression joinCondition = eventUserForJoin.event.id.eq(event.id);
        if (userId != null) {
            joinCondition = joinCondition.and(eventUserForJoin.user.id.eq(userId));
        }

        BooleanExpression canRegisterExpr;
        BooleanExpression canUnregisterExpr;

        if (userId == null) {
            canRegisterExpr = Expressions.FALSE.isTrue();
            canUnregisterExpr = Expressions.FALSE.isTrue();
        } else {
            canRegisterExpr = event.eventDate.after(dateNow)
                    .or(event.eventDate.eq(dateNow).and(event.startTime.after(timeNow)));

            canUnregisterExpr = eventUserForJoin.attended.isFalse().and(
                            event.eventDate.after(dateNow)
                            .or(event.eventDate.eq(dateNow).and(event.endTime.after(timeNow)))
            );
        }

        List<EventListDto> events = queryFactory
                .select(Projections.constructor(EventListDto.class,
                        event.id,
                        event.name,
                        Projections.constructor(EventCategoryReadDto.class,
                                eventCategory.id,
                                eventCategory.name
                        ),
                        event.shortDescription,
                        event.imageUrl,
                        event.eventDate,
                        event.startTime,
                        event.endTime,
                        event.deadline,
                        Projections.constructor(SpaceReadDto.class,
                                space.id,
                                space.name,
                                space.capacity,
                                Projections.constructor(BuildingReadDto.class,
                                        building.id,
                                        building.name,
                                        building.address
                                )
                        ),
                        event.eventUsers.size().as("participantQuantity"),
                        event.author.firstName.concat(" ").concat(event.author.lastName),
                        userId == null ? Expressions.FALSE.isTrue() : eventUserForJoin.id.isNotNull(),
                        canRegisterExpr,
                        canUnregisterExpr,
                        userId == null
                                ? Expressions.FALSE.isTrue()
                                : Expressions.booleanTemplate(
                                "COALESCE({0}.attended, FALSE)",
                                eventUserForJoin
                        )
                ))
                .from(event)
                .leftJoin(event.category, eventCategory)
                .leftJoin(event.space, space)
                .leftJoin(space.building, building)
                .leftJoin(event.author, user)
                .leftJoin(eventUserForJoin).on(joinCondition)
                .where(predicate)
                .orderBy(getSortOrder(filter))
                .limit(pageSize)
                .offset((long) page * pageSize)
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
            predicate = predicate.and(event.name.containsIgnoreCase(filter.name()));
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
            predicate = predicate.and(event.eventUsers.size().lt(event.space.capacity));
        }

        if(filter.period() != null) {
            LocalDate today = LocalDate.now();
            LocalTime now = LocalTime.now();
            predicate = switch (filter.period()) {
                case "past" -> {
                    BooleanExpression passedEvents = event.eventDate.before(today)
                            .or(event.eventDate.eq(today)
                                    .and(event.endTime.before(now)));
                    yield predicate.and(passedEvents);
                }
                case "future" -> {
                    BooleanExpression upcomingEvents = event.eventDate.after(today)
                            .or(event.eventDate.eq(today).and(event.startTime.goe(now)));
                    yield predicate.and(upcomingEvents);
                }
                default -> predicate;
            };
        }

        return predicate;
    }

    private OrderSpecifier<?>[] getSortOrder(EventFilter filter) {
        List<OrderSpecifier<?>> orderSpecifiers = new ArrayList<>();

        if (filter.sort() != null) {
            switch (filter.sort()) {
                case "date":
                    orderSpecifiers.add(event.eventDate.desc());
                    orderSpecifiers.add(event.startTime.desc());
                    break;
                case "popularity":
                    orderSpecifiers.add(event.eventUsers.size().asc());
                    break;
                case "availability":
                    orderSpecifiers.add(event.eventUsers.size().desc());
                    break;
                case "alphabet":
                    orderSpecifiers.add(event.name.asc());
                    break;
            }
        }
        orderSpecifiers.add(event.id.desc());
        return orderSpecifiers.toArray(new OrderSpecifier[0]);
    }
}
