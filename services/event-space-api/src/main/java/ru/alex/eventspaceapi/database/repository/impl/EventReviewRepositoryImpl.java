package ru.alex.eventspaceapi.database.repository.impl;

import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Component;
import ru.alex.eventspaceapi.database.entity.EventReview;
import ru.alex.eventspaceapi.database.repository.EventReviewRepositoryCustom;
import ru.alex.eventspaceapi.dto.eventCategory.EventCategoryReadDto;
import ru.alex.eventspaceapi.dto.eventReview.EventReviewListDto;
import ru.alex.eventspaceapi.dto.eventReview.EventReviewStatisticsDto;
import ru.alex.eventspaceapi.dto.filter.EventReviewFilter;
import ru.alex.eventspaceapi.mapper.eventReview.EventReviewStatisticsMapper;

import java.util.ArrayList;
import java.util.List;

import static ru.alex.eventspaceapi.database.entity.QEvent.event;
import static ru.alex.eventspaceapi.database.entity.QEventCategory.eventCategory;
import static ru.alex.eventspaceapi.database.entity.QEventReview.eventReview;
import static ru.alex.eventspaceapi.database.entity.QEventUser.eventUser;
import static ru.alex.eventspaceapi.database.entity.QHelpfulMark.helpfulMark;
import static ru.alex.eventspaceapi.database.entity.QUser.user;

@Component
@RequiredArgsConstructor
public class EventReviewRepositoryImpl implements EventReviewRepositoryCustom {
    private static final int REVIEWS_PAGE_SIZE = 20;

    private final JPAQueryFactory queryFactory;
    private final NamedParameterJdbcTemplate jdbcTemplate;
    private final EventReviewStatisticsMapper eventReviewStatisticsMapper;

    @Override
    public Slice<EventReview> findAllByEventWithFilter(Integer eventId, EventReviewFilter filter) {
        int page = filter.page() != null ? filter.page() : 0;

        List<EventReview> reviews = queryFactory
                .selectFrom(eventReview)
                .leftJoin(eventReview.author, user).fetchJoin()
                .leftJoin(eventReview.helpfulMarks, helpfulMark).fetchJoin()
                .where(eventReview.event.id.eq(eventId).and(buildPredicate(filter)))
                .orderBy(getSortOrder(filter))
                .offset((long) page * REVIEWS_PAGE_SIZE)
                .limit(REVIEWS_PAGE_SIZE + 1)
                .fetch();

        boolean hasNext = reviews.size() > REVIEWS_PAGE_SIZE;

        if (hasNext) {
            reviews = reviews.subList(0, REVIEWS_PAGE_SIZE);
        }

        return new SliceImpl<>(reviews, PageRequest.of(page, REVIEWS_PAGE_SIZE), hasNext);
    }

    @Override
    public Slice<EventReviewListDto> findAllByUserWithSort(Integer userId, EventReviewFilter filter) {
        int page = filter.page() != null ? filter.page() : 0;


        List<EventReviewListDto> reviews = queryFactory
                .select(Projections.constructor(
                        EventReviewListDto.class,
                        event.id,
                        event.name,
                        Projections.constructor(
                                EventCategoryReadDto.class,
                                eventCategory.id,
                                eventCategory.name,
                                eventCategory.color
                        ),
                        event.eventDate,
                        eventUser.id.countDistinct().intValue(),
                        eventReview.rating,
                        eventReview.content,
                        eventReview.createdAt
                ))
                .from(eventReview)
                .join(eventReview.event, event)
                .join(event.category, eventCategory)
                .leftJoin(event.eventUsers, eventUser)
                .where(eventReview.author.id.eq(userId))
                .groupBy(eventReview.id, event.id, event.name, eventCategory.id, eventCategory.name, event.eventDate,
                        eventReview.rating, eventReview.content, eventReview.createdAt)
                .orderBy(getSortOrder(filter))
                .offset((long) page * REVIEWS_PAGE_SIZE)
                .limit(REVIEWS_PAGE_SIZE + 1)
                .fetch();

        boolean hasNext = reviews.size() > REVIEWS_PAGE_SIZE;

        if (hasNext) {
            reviews = reviews.subList(0, REVIEWS_PAGE_SIZE);
        }

        return new SliceImpl<>(reviews, PageRequest.of(page, REVIEWS_PAGE_SIZE), hasNext);
    }

    @Override
    public EventReviewStatisticsDto getEventReviewStatisticsByEvent(Integer eventId) {
        String sql = """
                SELECT AVG(rating) as avg_rating,
                COUNT (*) FILTER (WHERE rating = 5) AS five_stars,
                COUNT (*) FILTER (WHERE rating = 4) AS four_stars,
                COUNT (*) FILTER (WHERE rating = 3) AS three_stars,
                COUNT (*) FILTER (WHERE rating = 2) AS two_stars,
                COUNT (*) FILTER (WHERE rating = 1) AS one_star,
                COUNT(*) as total
                FROM event_review
                WHERE event_id = :eventId
                """;
        MapSqlParameterSource params = new MapSqlParameterSource()
                .addValue("eventId", eventId);

        return jdbcTemplate.queryForObject(sql, params, eventReviewStatisticsMapper);
    }

    @Override
    public EventReviewStatisticsDto getEventReviewStatistics(Integer userId) {
        String sql = """
                SELECT AVG(rating) as avg_rating,
                COUNT (*) FILTER (WHERE rating = 5) AS five_stars,
                COUNT (*) FILTER (WHERE rating = 4) AS four_stars,
                COUNT (*) FILTER (WHERE rating = 3) AS three_stars,
                COUNT (*) FILTER (WHERE rating = 2) AS two_stars,
                COUNT (*) FILTER (WHERE rating = 1) AS one_star,
                COUNT(*) as total
                FROM event_review
                WHERE user_id = :userId
                """;

        MapSqlParameterSource params = new MapSqlParameterSource()
                .addValue("userId", userId);

        return jdbcTemplate.queryForObject(sql, params, eventReviewStatisticsMapper);
    }

    private BooleanExpression buildPredicate(EventReviewFilter filter) {
        BooleanExpression predicate = Expressions.TRUE.isTrue();
        if(filter.rating() != null) {
            predicate = predicate.and(eventReview.rating.eq(filter.rating()));
        }
        return predicate;
    }

    private OrderSpecifier<?>[] getSortOrder(EventReviewFilter filter) {
        List<OrderSpecifier<?>> orderSpecifiers = new ArrayList<>();

        if(filter.sort() != null) {
            switch (filter.sort()) {
                case "new":
                    orderSpecifiers.add(eventReview.createdAt.desc());
                    break;
                case "old":
                    orderSpecifiers.add(eventReview.createdAt.asc());
                    break;
                case "high-rating":
                    orderSpecifiers.add(eventReview.rating.desc());
                    break;
                case "low-rating":
                    orderSpecifiers.add(eventReview.rating.asc());
                    break;
                case "useful":
                    orderSpecifiers.add(eventReview.helpfulMarks.size().desc());
            }
        }
        orderSpecifiers.add(eventReview.id.desc());
        return orderSpecifiers.toArray(new OrderSpecifier[0]);
    }
}
