package ru.alex.eventspaceapi.http.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.alex.eventspaceapi.dto.EventCategory.EventCategoryCountDto;
import ru.alex.eventspaceapi.dto.EventCategory.EventCategoryReadDto;
import ru.alex.eventspaceapi.service.EventCategoryService;

import java.util.List;

@RestController
@RequestMapping("/api/event-categories")
@RequiredArgsConstructor
public class EventCategoryController {
    private final EventCategoryService eventCategoryService;

    @GetMapping
    public List<EventCategoryReadDto> findAll() {
        return eventCategoryService.findAll();
    }

    @GetMapping("/with-event-count")
    public List<EventCategoryCountDto> findAllWithEventCount() {
        return eventCategoryService.findAllCategoriesWithEventCount();
    }
}
