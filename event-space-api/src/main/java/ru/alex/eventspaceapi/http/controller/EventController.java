package ru.alex.eventspaceapi.http.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import ru.alex.eventspaceapi.dto.event.EventCreateDto;
import ru.alex.eventspaceapi.dto.event.EventListDto;
import ru.alex.eventspaceapi.dto.filter.EventFilter;
import ru.alex.eventspaceapi.dto.response.PageResponse;
import ru.alex.eventspaceapi.service.EventService;

import java.util.List;

import static org.springframework.http.HttpStatus.CREATED;

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

    @PostMapping
    public ResponseEntity<Void> create(
            @Validated @RequestPart("event")  EventCreateDto eventCreateDto,
            @RequestPart("image") MultipartFile image
    ) {
        eventService.create(eventCreateDto, image);
        return new ResponseEntity<>(CREATED);
    }
}
