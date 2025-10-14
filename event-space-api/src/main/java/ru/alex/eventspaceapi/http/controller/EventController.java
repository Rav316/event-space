package ru.alex.eventspaceapi.http.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import ru.alex.eventspaceapi.dto.event.EventCreateDto;
import ru.alex.eventspaceapi.dto.event.EventListDto;
import ru.alex.eventspaceapi.dto.event.EventReadDto;
import ru.alex.eventspaceapi.dto.filter.EventFilter;
import ru.alex.eventspaceapi.dto.response.PageResponse;
import ru.alex.eventspaceapi.service.EventService;

import java.util.List;

import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.NO_CONTENT;

@RestController
@RequestMapping("/api/events")
@RequiredArgsConstructor
public class EventController {
    private final EventService eventService;

    @GetMapping
    public PageResponse<EventListDto> findAllByFilter(@ModelAttribute EventFilter filter) {
        return PageResponse.of(eventService.findAllByFilter(filter));
    }

    @GetMapping("/actual")
    public List<EventListDto> getActualEvents() {
        return eventService.getActualEvents();
    }
    
    @GetMapping("/tags/{prefix}")
    public List<String> findTagsStartWith(@PathVariable("prefix") String prefix) {
        return eventService.findTagsStartWith(prefix);
    }

    @GetMapping("/{id}")
    public EventReadDto findById(@PathVariable("id") Integer id) {
        return eventService.findById(id);
    }

    @PostMapping
    public ResponseEntity<Void> create(
            @Validated @RequestPart("event")  EventCreateDto eventCreateDto,
            @RequestPart(value = "image", required = false) MultipartFile image
    ) {
        eventService.create(eventCreateDto, image);
        return new ResponseEntity<>(CREATED);
    }

    @PostMapping("/{id}/register")
    public ResponseEntity<Void> registerForEvent(@PathVariable("id") Integer id) {
        eventService.registerForEvent(id);
        return new ResponseEntity<>(CREATED);
    }

    @DeleteMapping("/{id}/unregister")
    public ResponseEntity<Void> unregisterFromEvent(@PathVariable("id") Integer id) {
        eventService.unregisterFromEvent(id);
        return new ResponseEntity<>(NO_CONTENT);
    }
}
