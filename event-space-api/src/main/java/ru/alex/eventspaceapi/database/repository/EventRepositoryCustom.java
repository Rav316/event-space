package ru.alex.eventspaceapi.database.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Slice;
import ru.alex.eventspaceapi.database.entity.Event;
import ru.alex.eventspaceapi.dto.filter.EventFilter;
import ru.alex.eventspaceapi.dto.filter.EventMyFilter;
import ru.alex.eventspaceapi.dto.filter.EventPreviewFilter;
import ru.alex.eventspaceapi.dto.statistics.EventAuthorStatisticsDto;

public interface EventRepositoryCustom {
    Page<Event> findAllEventsByFilter(Integer userId, EventFilter filter);

    Page<Event> findAllEventsByUser(Integer userId, EventMyFilter filter);

    Slice<Event> findAllEventsByFilter(EventPreviewFilter filter);

    EventAuthorStatisticsDto getEventStatisticsByUser(Integer userId);
}
