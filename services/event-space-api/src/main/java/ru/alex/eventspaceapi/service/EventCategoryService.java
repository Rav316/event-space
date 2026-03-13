package ru.alex.eventspaceapi.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.alex.eventspaceapi.database.entity.EventCategory;
import ru.alex.eventspaceapi.database.repository.EventCategoryRepository;
import ru.alex.eventspaceapi.dto.eventCategory.EventCategoryCountDto;
import ru.alex.eventspaceapi.dto.eventCategory.EventCategoryCreateDto;
import ru.alex.eventspaceapi.dto.eventCategory.EventCategoryDeleteImpactDto;
import ru.alex.eventspaceapi.dto.eventCategory.EventCategoryEditDto;
import ru.alex.eventspaceapi.dto.eventCategory.EventCategoryReadDto;
import ru.alex.eventspaceapi.dto.filter.AdminListFilter;
import ru.alex.eventspaceapi.exception.EventCategoryNotFoundException;
import ru.alex.eventspaceapi.mapper.eventCategory.EventCategoryCountMapper;
import ru.alex.eventspaceapi.mapper.eventCategory.EventCategoryCreateMapper;
import ru.alex.eventspaceapi.mapper.eventCategory.EventCategoryEditMapper;
import ru.alex.eventspaceapi.mapper.eventCategory.EventCategoryReadMapper;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class EventCategoryService {
    private final EventCategoryRepository eventCategoryRepository;
    private final EventCategoryReadMapper eventCategoryReadMapper;
    private final EventCategoryCountMapper eventCategoryCountMapper;
    private final EventCategoryCreateMapper eventCategoryCreateMapper;
    private final EventCategoryEditMapper eventCategoryEditMapper;

    public List<EventCategoryReadDto> findAll() {
        return eventCategoryRepository.findAll(Sort.by("name"))
                .stream()
                .map(eventCategoryReadMapper::toDto)
                .toList();
    }

    public Page<EventCategoryReadDto> findAllByFilter(AdminListFilter filter, Sort sort) {
        return eventCategoryRepository.findAllByFilter(filter, sort)
                .map(eventCategoryReadMapper::toDto);
    }

    public List<EventCategoryCountDto> findAllCategoriesWithEventCount() {
        return eventCategoryRepository.findAllWithEvents()
                .stream()
                .map(eventCategoryCountMapper::toDto)
                .toList();
    }

    public boolean existsByName(String name) {
        return eventCategoryRepository.existsByName(name);
    }

    @Transactional
    public EventCategoryReadDto create(EventCategoryCreateDto dto) {
        EventCategory category = eventCategoryCreateMapper.toEntity(dto);
        return eventCategoryReadMapper.toDto(eventCategoryRepository.save(category));
    }

    @Transactional
    public EventCategoryReadDto update(Integer id, EventCategoryEditDto dto) {
        EventCategory category = eventCategoryRepository.findById(id)
                .orElseThrow(() -> new EventCategoryNotFoundException(id));
        eventCategoryEditMapper.updateFromEntity(dto, category);

        return eventCategoryReadMapper.toDto(eventCategoryRepository.save(category));
    }

    public EventCategoryDeleteImpactDto getDeleteImpact(Integer id) {
        return eventCategoryRepository.getDeleteImpact(id);
    }

    @Transactional
    public void delete(Integer id) {
        eventCategoryRepository.deleteById(id);
    }
}
