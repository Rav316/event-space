package ru.alex.eventspaceapi.database.repository;

import org.springframework.data.domain.Page;
import ru.alex.eventspaceapi.database.entity.Event;
import ru.alex.eventspaceapi.dto.filter.EventFilter;

public interface EventRepositoryCustom {
    Page<Event> findAllEventsByFilter(EventFilter filter);
}
