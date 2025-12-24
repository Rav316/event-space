package ru.alex.eventspaceapi.database.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Slice;
import ru.alex.eventspaceapi.database.entity.Event;
import ru.alex.eventspaceapi.dto.filter.EventFilter;
import ru.alex.eventspaceapi.dto.filter.EventPreviewFilter;

public interface EventRepositoryCustom {
    Page<Event> findAllEventsByFilter(Integer userId, EventFilter filter);

    Slice<Event> findAllEventsByFilter(EventPreviewFilter filter);
}
