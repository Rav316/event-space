package ru.alex.eventspaceapi.database.repository.impl;

import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Component;
import ru.alex.eventspaceapi.database.entity.Event;
import ru.alex.eventspaceapi.database.repository.EventRepositoryCustom;
import ru.alex.eventspaceapi.dto.filter.EventFilter;
import ru.alex.eventspaceapi.dto.filter.EventMyFilter;
import ru.alex.eventspaceapi.dto.filter.EventPreviewFilter;
import ru.alex.eventspaceapi.dto.statistics.EventAuthorStatisticsDto;
import ru.alex.eventspaceapi.mapper.event.EventMyStatisticsMapper;

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
    private final EventMyStatisticsMapper eventMyStatisticsMapper;

    private static final int PAGE_SIZE = 9;

    @Override
    public Page<Event> findAllEventsByFilter(Integer userId, EventFilter filter) {
        BooleanExpression predicate = buildPredicate(filter);
        int page = filter.page() != null ? filter.page() : 0;

        List<Event> events = queryFactory
                .selectFrom(event)
                .leftJoin(event.category, eventCategory).fetchJoin()
                .leftJoin(event.space, space).fetchJoin()
                .leftJoin(space.building, building).fetchJoin()
                .leftJoin(event.author, user).fetchJoin()
                .leftJoin(event.eventUsers, eventUser).fetchJoin()
                .where(predicate)
                .orderBy(getSortOrder(filter.sort()))
                .limit(PAGE_SIZE)
                .offset((long) page * PAGE_SIZE)
                .fetch();

        Long total = queryFactory
                .select(event.count())
                .from(event)
                .where(predicate)
                .fetchOne();

        return new PageImpl<>(events, PageRequest.of(page, PAGE_SIZE), Objects.requireNonNull(total));
    }

    @Override
    public Page<Event> findAllEventsByUser(Integer userId, EventMyFilter filter) {
        BooleanExpression predicate = event.author.id.eq(userId).and(buildPredicate(filter));
        int page = filter.page() != null ? filter.page() : 0;

        List<Event> events = queryFactory
                .selectFrom(event)
                .leftJoin(event.category, eventCategory).fetchJoin()
                .leftJoin(event.space, space).fetchJoin()
                .leftJoin(space.building, building).fetchJoin()
                .leftJoin(event.author, user).fetchJoin()
                .leftJoin(event.eventUsers, eventUser).fetchJoin()
                .where(predicate)
                .orderBy(event.name.asc())
                .limit(PAGE_SIZE)
                .offset((long) page * PAGE_SIZE)
                .fetch();

        Long total = queryFactory
                .select(event.count())
                .from(event)
                .where(predicate)
                .fetchOne();

        return new PageImpl<>(events, PageRequest.of(page, PAGE_SIZE), Objects.requireNonNull(total));
    }

    @Override
    public Slice<Event> findAllEventsByFilter(EventPreviewFilter filter) {
        int pageSize = 25;
        int page = filter.page() != null ? filter.page() : 0;

        BooleanExpression predicate = buildPredicate(filter);

        List<Event> events = queryFactory
                .selectFrom(event)
                .leftJoin(event.category, eventCategory).fetchJoin()
                .leftJoin(event.space, space).fetchJoin()
                .leftJoin(space.building, building).fetchJoin()
                .where(predicate)
                .orderBy(getSortOrder(filter.sort()))
                .limit(pageSize + 1)
                .offset((long) page * pageSize)
                .fetch();

        boolean hasNext = events.size() > pageSize;

        if(hasNext) {
            events = events.subList(0, pageSize);
        }

        return new SliceImpl<>(events, PageRequest.of(page, pageSize), hasNext);

    }

    @Override
    public EventAuthorStatisticsDto getEventStatisticsByUser(Integer userId) {
        String sql = """
                SELECT
                    COUNT(DISTINCT e.id)  events_count,
                    COUNT(eu.user_id) participants_count
                FROM event e
                LEFT JOIN event_user eu ON eu.event_id = e.id
                WHERE e.author = :userId;
                """;
        MapSqlParameterSource params = new MapSqlParameterSource()
                .addValue("userId", userId);

        return jdbcTemplate.queryForObject(sql, params, eventMyStatisticsMapper);
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

        return getPeriodPredicate(predicate, filter.period());
    }

    private BooleanExpression buildPredicate(EventMyFilter filter) {
        BooleanExpression predicate = Expressions.TRUE.isTrue();
        if (filter.name() != null && !filter.name().isBlank()) {
            predicate = predicate.and(event.name.containsIgnoreCase(filter.name()));
        }
        if (filter.category() != null) {
            predicate = predicate.and(event.category.id.eq(filter.category()));
        }
        return predicate;
    }

    private BooleanExpression buildPredicate(EventPreviewFilter filter) {
        BooleanExpression predicate = Expressions.TRUE.isTrue();
        if (filter.name() != null && !filter.name().isBlank()) {
            predicate = predicate.and(event.name.containsIgnoreCase(filter.name()));
        }
        if (filter.categories() != null && !filter.categories().isEmpty()) {
            predicate = predicate.and(event.category.id.in(filter.categories()));
        }
        return getPeriodPredicate(predicate, filter.period());
    }

    private BooleanExpression getPeriodPredicate(BooleanExpression predicate, String period) {
        if(period != null) {
            LocalDate today = LocalDate.now();
            LocalTime now = LocalTime.now();
            predicate = switch (period) {
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

    private OrderSpecifier<?>[] getSortOrder(String sort) {
        List<OrderSpecifier<?>> orderSpecifiers = new ArrayList<>();

        if (sort != null) {
            switch (sort) {
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
