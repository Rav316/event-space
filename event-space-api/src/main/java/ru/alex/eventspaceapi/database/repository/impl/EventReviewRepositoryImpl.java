package ru.alex.eventspaceapi.database.repository.impl;

import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.stereotype.Component;
import ru.alex.eventspaceapi.database.entity.EventReview;
import ru.alex.eventspaceapi.database.repository.EventReviewRepositoryCustom;
import ru.alex.eventspaceapi.dto.filter.EventReviewFilter;

import java.util.List;

import static ru.alex.eventspaceapi.database.entity.QEventReview.eventReview;
import static ru.alex.eventspaceapi.database.entity.QUser.user;

@Component
@RequiredArgsConstructor
public class EventReviewRepositoryImpl implements EventReviewRepositoryCustom {
    private final JPAQueryFactory queryFactory;

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
}
