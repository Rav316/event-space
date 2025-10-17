package ru.alex.eventspaceapi.database.repository;

import org.springframework.data.domain.Page;
import ru.alex.eventspaceapi.dto.event.EventListDto;
import ru.alex.eventspaceapi.dto.filter.EventFilter;

public interface EventRepositoryCustom {
    Page<EventListDto> findAllEventsByFilter(Integer userId, EventFilter filter);
}
