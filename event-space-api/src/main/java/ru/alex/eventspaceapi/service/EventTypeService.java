package ru.alex.eventspaceapi.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.alex.eventspaceapi.database.repository.EventTypeRepository;
import ru.alex.eventspaceapi.dto.eventType.EventTypeReadDto;
import ru.alex.eventspaceapi.mapper.eventType.EventTypeReadMapper;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class EventTypeService {
    private final EventTypeRepository eventTypeRepository;
    private final EventTypeReadMapper eventTypeReadMapper;

    public List<EventTypeReadDto> findAll() {
        return eventTypeRepository.findAll(Sort.by("name"))
                .stream()
                .map(eventTypeReadMapper::toDto)
                .toList();
    }
}
