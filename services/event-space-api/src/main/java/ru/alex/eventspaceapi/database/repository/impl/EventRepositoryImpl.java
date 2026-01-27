package ru.alex.eventspaceapi.database.repository.impl;

import com.querydsl.core.Tuple;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.JPQLSubQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Component;
import ru.alex.eventspaceapi.database.entity.Event;
import ru.alex.eventspaceapi.database.entity.EventUser;
import ru.alex.eventspaceapi.database.repository.EventRepositoryCustom;
import ru.alex.eventspaceapi.dto.building.BuildingReadDto;
import ru.alex.eventspaceapi.dto.event.EventListDto;
import ru.alex.eventspaceapi.dto.eventCategory.EventCategoryReadDto;
import ru.alex.eventspaceapi.dto.filter.EventFilter;
import ru.alex.eventspaceapi.dto.filter.EventMyFilter;
import ru.alex.eventspaceapi.dto.filter.EventPreviewFilter;
import ru.alex.eventspaceapi.dto.space.SpaceReadDto;
import ru.alex.eventspaceapi.dto.statistics.EventAuthorStatisticsDto;
import ru.alex.eventspaceapi.mapper.event.EventMyStatisticsMapper;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

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
        Pageable pageable = PageRequest.of(page, PAGE_SIZE);


        JPQLSubQuery<Long> registeredUsersCount =
                JPAExpressions
                        .select(eventUser.id.count())
                        .from(eventUser)
                        .where(eventUser.event.eq(event));


        List<Tuple> rows = queryFactory
                .select(event, registeredUsersCount)
                .from(event)
                .leftJoin(event.category, eventCategory).fetchJoin()
                .leftJoin(event.space, space).fetchJoin()
                .leftJoin(space.building, building).fetchJoin()
                .leftJoin(event.author, user).fetchJoin()
                .where(predicate)
                .orderBy(getSortOrder(filter.sort()))
                .limit(pageable.getPageSize())
                .offset(pageable.getOffset())
                .fetch();


        List<Event> events = rows.stream()
                .map(t -> {
                    Event e = t.get(event);
                    Long count = t.get(registeredUsersCount);
                    if (e != null) {
                        e.setRegisteredUsers(count != null ? count : 0L);
                    }
                    return e;
                })
                .toList();

        if (userId != null && !events.isEmpty()) {
            List<Integer> eventIds = events.stream()
                    .map(Event::getId)
                    .toList();

            Map<Integer, EventUser> statusMap = queryFactory
                    .selectFrom(eventUser)
                    .where(
                            eventUser.event.id.in(eventIds)
                                    .and(eventUser.user.id.eq(userId))
                    )
                    .fetch()
                    .stream()
                    .collect(Collectors.toMap(
                            eu -> eu.getEvent().getId(),
                            eu -> eu
                    ));

            events.forEach(e ->
                    e.setCurrentUserStatus(statusMap.get(e.getId()))
            );
        }

        Long total = queryFactory
                .select(event.count())
                .from(event)
                .where(predicate)
                .fetchOne();

        return new PageImpl<>(
                events,
                pageable,
                total != null ? total : 0
        );
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
    public List<EventListDto> getActualEvents(Integer userId) {
        String sql = """
                SELECT
                e.id,
                e.name,
                e.short_description,
                e.image_url,
                e.event_date,
                e.start_time,
                e.end_time,
                e.deadline,
                e.participant_quantity,
            
                c.id   AS category_id,
                c.name AS category_name,
            
                s.id   AS space_id,
                s.name AS space_name,
                s.capacity AS space_capacity,
            
                b.id   AS building_id,
                b.name AS building_name,
                b.address AS building_address,
            
                concat(a.first_name, ' ', a.last_name) AS author,
            
                (
                    SELECT COUNT(*)
                    FROM event_user eu
                    WHERE eu.event_id = e.id
                ) AS registered_users,
            
                EXISTS (
                    SELECT 1
                    FROM event_user eu
                    WHERE eu.event_id = e.id
                      AND eu.user_id = :userId
                ) AS is_registered,
            
                (
                    SELECT eu.attended
                    FROM event_user eu
                    WHERE eu.event_id = e.id
                      AND eu.user_id = :userId
                ) AS is_attended,
            
                (
                    SELECT eu.qr_token
                    FROM event_user eu
                    WHERE eu.event_id = e.id
                      AND eu.user_id = :userId
                ) AS qr_token
            
            FROM event e
            LEFT JOIN event_category c ON c.id = e.event_category_id
            LEFT JOIN space s ON s.id = e.space_id
            LEFT JOIN building b ON b.id = s.building_id
            LEFT JOIN users a ON a.id = e.author
            
            WHERE (e.event_date, e.start_time) > (CURRENT_DATE, CURRENT_TIME)
            ORDER BY e.event_date , e.start_time DESC, e.id DESC
            LIMIT 6;
            """;

        Map<String, Integer> params = Collections.singletonMap("userId", userId);

        return jdbcTemplate.query(sql, params, (rs, rowNum) -> {

            EventCategoryReadDto category = rs.getInt("category_id") == 0
                    ? null
                    : new EventCategoryReadDto(
                    rs.getInt("category_id"),
                    rs.getString("category_name")
            );

            SpaceReadDto space = rs.getInt("space_id") == 0
                    ? null
                    : new SpaceReadDto(
                    rs.getInt("space_id"),
                    rs.getString("space_name"),
                    rs.getShort("space_capacity"),
                    new BuildingReadDto(
                            rs.getInt("building_id"),
                            rs.getString("building_name"),
                            rs.getString("building_address")
                    )
            );

            LocalDate eventDate = rs.getDate("event_date").toLocalDate();
            LocalTime startTime = rs.getTime("start_time").toLocalTime();
            LocalTime endTime = rs.getTime("end_time").toLocalTime();

            boolean isRegistered = rs.getBoolean("is_registered");
            Boolean isAttended = rs.getObject("is_attended") != null
                    ? rs.getBoolean("is_attended")
                    : null;

            String qrToken = rs.getString("qr_token");

            /* бизнес-логика */
            LocalDate nowDate = LocalDate.now();
            LocalTime nowTime = LocalTime.now();

            boolean canRegister =
                    eventDate.isAfter(nowDate)
                            || (eventDate.equals(nowDate) && startTime.isAfter(nowTime));

            boolean canUnregister =
                    isRegistered
                            && !Boolean.TRUE.equals(isAttended)
                            && (eventDate.isAfter(nowDate)
                            || (eventDate.equals(nowDate) && endTime.isAfter(nowTime)));

            return new EventListDto(
                    rs.getInt("id"),
                    rs.getString("name"),
                    category,
                    rs.getString("short_description"),
                    rs.getString("image_url"),
                    eventDate,
                    startTime,
                    endTime,
                    rs.getDate("deadline") != null
                            ? rs.getDate("deadline").toLocalDate()
                            : null,
                    space,
                    rs.getLong("registered_users"),
                    rs.getInt("participant_quantity"),
                    rs.getString("author"),
                    isRegistered,
                    canRegister,
                    canUnregister,
                    isAttended,
                    qrToken
            );
        });
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
