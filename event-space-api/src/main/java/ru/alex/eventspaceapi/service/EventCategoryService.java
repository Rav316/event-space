package ru.alex.eventspaceapi.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.alex.eventspaceapi.database.repository.EventCategoryRepository;
import ru.alex.eventspaceapi.dto.EventCategory.EventCategoryReadDto;
import ru.alex.eventspaceapi.mapper.eventCategory.EventCategoryReadMapper;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class EventCategoryService {
    private final EventCategoryRepository eventCategoryRepository;
    private final EventCategoryReadMapper eventCategoryReadMapper;

    public List<EventCategoryReadDto> findAll() {
        return eventCategoryRepository.findAll(Sort.by("name"))
                .stream()
                .map(eventCategoryReadMapper::toDto)
                .toList();
    }
}
