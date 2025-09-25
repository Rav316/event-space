package ru.alex.eventspaceapi.http.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.alex.eventspaceapi.dto.eventType.EventTypeReadDto;
import ru.alex.eventspaceapi.service.EventTypeService;

import java.util.List;

@RestController
@RequestMapping("/api/event-types")
@RequiredArgsConstructor
public class EventTypeController {
    private final EventTypeService eventTypeService;

    @GetMapping
    public List<EventTypeReadDto> findAll() {
        return eventTypeService.findAll();
    }
}
