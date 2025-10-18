package ru.alex.eventspaceapi.http.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import ru.alex.eventspaceapi.dto.event.EventCreateDto;
import ru.alex.eventspaceapi.dto.event.EventListDto;
import ru.alex.eventspaceapi.dto.event.EventReadDto;
import ru.alex.eventspaceapi.dto.eventReview.EventReviewCreateDto;
import ru.alex.eventspaceapi.dto.eventReview.EventReviewReadDto;
import ru.alex.eventspaceapi.dto.eventStep.EventStepReadDto;
import ru.alex.eventspaceapi.dto.filter.EventFilter;
import ru.alex.eventspaceapi.dto.filter.EventReviewFilter;
import ru.alex.eventspaceapi.dto.response.PageResponse;
import ru.alex.eventspaceapi.dto.response.SliceResponse;
import ru.alex.eventspaceapi.service.EventReviewService;
import ru.alex.eventspaceapi.service.EventService;
import ru.alex.eventspaceapi.service.EventStepService;

import java.util.List;

import static org.springframework.http.HttpStatus.*;

@RestController
@RequestMapping("/api/events")
@RequiredArgsConstructor
public class EventController {
    private final EventService eventService;
    private final EventStepService eventStepService;
    private final EventReviewService eventReviewService;

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

    @GetMapping("/{id}/steps")
    public List<EventStepReadDto> getEventStepsByEvent(@PathVariable("id") Integer id) {
        return eventStepService.findAllStepsByEvent(id);
    }

    @GetMapping("/{id}/reviews")
    public SliceResponse<EventReviewReadDto> findAllByEvent(
            @PathVariable("id") Integer id,
            @Validated @ModelAttribute EventReviewFilter filter
    ) {
        return SliceResponse.of(eventReviewService.findAllReviewsByEvent(id, filter));
    }

    @PostMapping("/{id}/confirm-attendance")
    @PreAuthorize("hasAuthority('VERIFIER')")
    public ResponseEntity<Void> confirmParticipantAttendance(
            @PathVariable("id") Integer id,
            @RequestParam("token") String token
    ) {
        eventService.confirmParticipantAttendance(id, token);
        return new ResponseEntity<>(OK);
    }

    @PostMapping("/{id}/add-review")
    public ResponseEntity<EventReviewReadDto> addReviewForEvent(
            @PathVariable("id") Integer id,
            @Validated @RequestBody EventReviewCreateDto eventReviewCreateDto
            ) {
        return new ResponseEntity<>(eventReviewService.addReviewForEvent(id, eventReviewCreateDto), CREATED);
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
