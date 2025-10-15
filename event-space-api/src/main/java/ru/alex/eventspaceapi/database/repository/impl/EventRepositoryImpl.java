package ru.alex.eventspaceapi.database.repository.impl;

import com.querydsl.core.types.Expression;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Component;
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
import static ru.alex.eventspaceapi.database.entity.QEventUser.eventUser;
import static ru.alex.eventspaceapi.database.entity.QSpace.space;
import static ru.alex.eventspaceapi.database.entity.QUser.user;

@Component
@RequiredArgsConstructor
public class EventRepositoryImpl implements EventRepositoryCustom {
    private final JPAQueryFactory queryFactory;
    private final NamedParameterJdbcTemplate jdbcTemplate;

    @Override
    public Page<EventListDto> findAllEventsByFilter(Integer userId, EventFilter filter) {
        BooleanExpression predicate = buildPredicate(filter);
        int pageSize = 9;
        int page = filter.page() != null ? filter.page() : 0;
        Expression<Boolean> isRegisteredExpr = (userId != null)
                ? JPAExpressions.selectOne()
                .from(eventUser)
                .where(eventUser.event.id.eq(event.id)
                        .and(eventUser.user.id.eq(userId)))
                .exists()
                : Expressions.asBoolean(false);

        LocalDate dateNow = LocalDate.now();
        LocalTime timeNow = LocalTime.now();
        BooleanExpression canRegisterExpr =
                event.eventDate.after(dateNow)
                        .or(event.eventDate.eq(dateNow).and(event.startTime.after(timeNow)));
        BooleanExpression canUnregisterExpr =
                event.eventDate.after(dateNow)
                        .or(event.eventDate.eq(dateNow).and(event.endTime.after(timeNow)));

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
                        isRegisteredExpr,
                        canRegisterExpr,
                        canUnregisterExpr
                ))
                .from(event)
                .leftJoin(event.category, eventCategory)
                .leftJoin(event.space, space)
                .leftJoin(space.building, building)
                .leftJoin(event.author, user)
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

    @Override
    public void registerUserForEvent(Integer eventId, Integer userId) {
        String sql = """
                INSERT INTO event_user (event_id, user_id)
                VALUES (:eventId, :userId);
                """;
        MapSqlParameterSource params = new MapSqlParameterSource()
                .addValue("eventId", eventId)
                .addValue("userId", userId);

        jdbcTemplate.update(sql, params);
    }

    @Override
    public void unregisterFromEvent(Integer eventId, Integer userId) {
        String sql = """
                DELETE FROM event_user
                WHERE event_id = :eventId AND user_id = :userId
                """;

        MapSqlParameterSource params = new MapSqlParameterSource()
                .addValue("eventId", eventId)
                .addValue("userId", userId);

        jdbcTemplate.update(sql, params);
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
                    orderSpecifiers.add(event.startTime.asc());
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
