package ru.alex.eventspaceapi.database.repository;

import org.springframework.data.domain.Slice;
import ru.alex.eventspaceapi.database.entity.EventReview;
import ru.alex.eventspaceapi.dto.eventReview.EventReviewStatisticsDto;
import ru.alex.eventspaceapi.dto.filter.EventReviewFilter;

public interface EventReviewRepositoryCustom {
    Slice<EventReview> findAllByEventWithFilter(Integer eventId, EventReviewFilter filter);

    EventReviewStatisticsDto getEventReviewStatisticsByEvent(Integer eventId);

    EventReviewStatisticsDto getEventReviewStatistics(Integer userId);
}
