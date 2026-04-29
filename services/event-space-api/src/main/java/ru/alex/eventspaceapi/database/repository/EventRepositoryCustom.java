package ru.alex.eventspaceapi.database.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.Sort;
import ru.alex.eventspaceapi.database.entity.Event;
import ru.alex.eventspaceapi.dto.event.EventListDto;
import ru.alex.eventspaceapi.dto.filter.AdminListFilter;
import ru.alex.eventspaceapi.dto.filter.EventFilter;
import ru.alex.eventspaceapi.dto.filter.EventMyFilter;
import ru.alex.eventspaceapi.dto.filter.EventPreviewFilter;
import ru.alex.eventspaceapi.dto.statistics.EventAuthorStatisticsDto;

import ru.alex.eventspaceapi.dto.event.EventCalendarDto;

import java.util.List;

public interface EventRepositoryCustom {
    Page<Event> findAllEventsByFilter(Integer userId, EventFilter filter);

    Page<Event> findAllEventsByFilter(AdminListFilter filter, Sort sort);

    Page<Event> findAllEventsByUser(Integer userId, EventMyFilter filter);

    Slice<Event> findAllEventsByFilter(EventPreviewFilter filter);

    List<EventListDto> getActualEvents(Integer userId);

    List<EventListDto> getPopularEvents(Integer userId);

    List<EventListDto> getRecommendedEvents(Integer userId, List<Integer> categoryIds);

    List<EventCalendarDto> getEventsByMonth(Integer year, Integer month);

    EventAuthorStatisticsDto getEventStatisticsByUser(Integer userId);
}
