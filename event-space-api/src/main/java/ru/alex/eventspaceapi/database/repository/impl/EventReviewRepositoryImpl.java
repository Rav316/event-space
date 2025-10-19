package ru.alex.eventspaceapi.database.repository.impl;

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
import ru.alex.eventspaceapi.dto.eventReview.EventReviewStatisticsDto;
import ru.alex.eventspaceapi.dto.filter.EventReviewFilter;
import ru.alex.eventspaceapi.mapper.eventReview.EventReviewStatisticsMapper;

import java.util.List;

import static ru.alex.eventspaceapi.database.entity.QEventReview.eventReview;
import static ru.alex.eventspaceapi.database.entity.QUser.user;

@Component
@RequiredArgsConstructor
public class EventReviewRepositoryImpl implements EventReviewRepositoryCustom {
    private final JPAQueryFactory queryFactory;
    private final NamedParameterJdbcTemplate jdbcTemplate;
    private final EventReviewStatisticsMapper eventReviewStatisticsMapper;

    @Override
    public Slice<EventReview> findAllByEventWithFilter(Integer eventId, EventReviewFilter filter) {
        int pageSize = 20;
        int page = filter.page() != null ? filter.page() : 0;

        List<EventReview> reviews = queryFactory
                .selectFrom(eventReview)
                .leftJoin(eventReview.author, user).fetchJoin()
                .where(eventReview.event.id.eq(eventId))
                .offset((long) page * pageSize)
                .limit(pageSize + 1)
                .fetch();

        boolean hasNext = reviews.size() > pageSize;

        if (hasNext) {
            reviews = reviews.subList(0, pageSize);
        }

        return new SliceImpl<>(reviews, PageRequest.of(page, pageSize), hasNext);
    }

    @Override
    public EventReviewStatisticsDto getEventReviewStatistics(Integer eventId) {
        String sql = """
                SELECT AVG(rating) as avg_rating,
                COUNT (*) FILTER (WHERE rating = 5) AS five_stars,
                COUNT (*) FILTER (WHERE rating = 4) AS four_stars,
                COUNT (*) FILTER (WHERE rating = 3) AS three_stars,
                COUNT (*) FILTER (WHERE rating = 2) AS two_stars,
                COUNT (*) FILTER (WHERE rating = 1) AS one_star,
                COUNT(*) as total_reviews
                FROM event_review
                WHERE event_id = :eventId
                """;
        MapSqlParameterSource params = new MapSqlParameterSource()
                .addValue("eventId", eventId);

        return jdbcTemplate.queryForObject(sql, params, eventReviewStatisticsMapper);
    }
}
