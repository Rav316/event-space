package ru.alex.eventspaceapi.http.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import ru.alex.eventspaceapi.dto.event.EventCreateDto;
import ru.alex.eventspaceapi.dto.event.EventDetailsDto;
import ru.alex.eventspaceapi.dto.event.EventEditDto;
import ru.alex.eventspaceapi.dto.event.EventListDto;
import ru.alex.eventspaceapi.dto.event.EventListForUserDto;
import ru.alex.eventspaceapi.dto.event.EventListMyDto;
import ru.alex.eventspaceapi.dto.event.EventListPreviewDto;
import ru.alex.eventspaceapi.dto.event.EventQrInfoDto;
import ru.alex.eventspaceapi.dto.event.EventReadDto;
import ru.alex.eventspaceapi.dto.eventReview.EventReviewCreateEditDto;
import ru.alex.eventspaceapi.dto.eventReview.EventReviewMyDto;
import ru.alex.eventspaceapi.dto.eventReview.EventReviewReadDto;
import ru.alex.eventspaceapi.dto.eventReview.EventReviewStatisticsDto;
import ru.alex.eventspaceapi.dto.eventStep.EventStepReadDto;
import ru.alex.eventspaceapi.dto.filter.EventFilter;
import ru.alex.eventspaceapi.dto.filter.EventMyFilter;
import ru.alex.eventspaceapi.dto.filter.EventPreviewFilter;
import ru.alex.eventspaceapi.dto.filter.EventReviewFilter;
import ru.alex.eventspaceapi.dto.response.PageResponse;
import ru.alex.eventspaceapi.dto.response.SliceResponse;
import ru.alex.eventspaceapi.service.*;

import java.util.List;

import static org.springframework.http.HttpStatus.*;

@RestController
@RequestMapping("/api/events")
@RequiredArgsConstructor
public class EventController {
    private final EventService eventService;
    private final EventUserService eventUserService;
    private final EventStepService eventStepService;
    private final EventReviewService eventReviewService;

    @GetMapping
    public PageResponse<EventListDto> findAllByFilter(@ModelAttribute EventFilter filter) {
        return PageResponse.of(eventService.findAllByFilter(filter));
    }

    @GetMapping("/my")
    public PageResponse<EventListMyDto> findAllMyEvents(@ModelAttribute EventMyFilter filter) {
        return PageResponse.of(eventService.findAllMyEvents(filter));
    }

    @GetMapping("/preview")
    public SliceResponse<EventListPreviewDto> findAllPreviewEventsByFilter(@ModelAttribute EventPreviewFilter filter) {
        return SliceResponse.of(eventService.findAllByFilter(filter));
    }

    @GetMapping("/actual")
    public List<EventListDto> getActualEvents() {
        return eventService.getActualEvents();
    }

    @GetMapping("/my/upcoming")
    public SliceResponse<EventListForUserDto> getUpcomingEventsForUser(@RequestParam("page") Integer page) {
        return SliceResponse.of(eventService.getUpcomingEventsForUser(page));
    }

    @GetMapping("/my/finished")
    public SliceResponse<EventListForUserDto> getFinishedEventsForUser(@RequestParam("page") Integer page) {
        return SliceResponse.of(eventService.getFinishedEventsForUser(page));
    }

    @GetMapping("/tags/{prefix}")
    public List<String> findTagsStartWith(@PathVariable String prefix) {
        return eventService.findTagsStartWith(prefix);
    }

    @GetMapping("/{id}")
    public EventReadDto findById(@PathVariable Integer id) {
        return eventService.findById(id);
    }

    @GetMapping("/{id}/details")
    public ResponseEntity<EventDetailsDto> findByIdWithDetails(@PathVariable Integer id) {
        return new ResponseEntity<>(eventService.findByIdWithDetails(id), OK);
    }

    @GetMapping("/{id}/steps")
    public List<EventStepReadDto> getEventStepsByEvent(@PathVariable Integer id) {
        return eventStepService.findAllStepsByEvent(id);
    }

    @GetMapping("/{id}/reviews")
    public SliceResponse<EventReviewReadDto> findAllByEvent(
            @PathVariable Integer id,
            @Validated @ModelAttribute EventReviewFilter filter
    ) {
        return SliceResponse.of(eventReviewService.findAllReviewsByEvent(id, filter));
    }

    @PostMapping("/{id}/reviews")
    public ResponseEntity<EventReviewReadDto> addReviewForEvent(
            @PathVariable Integer id,
            @Validated @RequestBody EventReviewCreateEditDto eventReviewCreateEditDto
    ) {
        return new ResponseEntity<>(eventReviewService.addReviewForEvent(id, eventReviewCreateEditDto), CREATED);
    }

    @PutMapping("/{id}/reviews")
    public ResponseEntity<Void> updateEventReview(
            @PathVariable Integer id,
            @Validated @RequestBody EventReviewCreateEditDto eventReviewCreateEditDto
    ) {
        eventReviewService.updateReviewByEvent(id, eventReviewCreateEditDto);
        return new ResponseEntity<>(OK);
    }

    @DeleteMapping("/{id}/reviews")
    public ResponseEntity<Void> deleteReviewByEvent(@PathVariable Integer id) {
        eventReviewService.deleteReviewByEvent(id);
        return new ResponseEntity<>(NO_CONTENT);
    }

    @GetMapping("/{id}/reviews/my")
    public ResponseEntity<EventReviewMyDto> getMyReviewForEvent(@PathVariable Integer id) {
        return new ResponseEntity<>(eventReviewService.getUserReviewByEvent(id), OK);
    }

    @GetMapping("/{id}/reviews/statistics")
    public EventReviewStatisticsDto getEventReviewsStatistics(@PathVariable Integer id) {
        return eventReviewService.getEventReviewsStatistics(id);
    }

    @PostMapping("/confirm-attendance/{token}")
    @PreAuthorize("hasAnyAuthority('VERIFIER', 'ADMIN')")
    public ResponseEntity<EventQrInfoDto> confirmParticipantAttendance(@PathVariable String token) {
        return new ResponseEntity<>(eventUserService.confirmParticipantAttendance(token), OK);
    }

    @PostMapping
    public ResponseEntity<Void> create(
            @Validated @RequestPart("event") EventCreateDto eventCreateDto,
            @RequestPart(value = "image", required = false) MultipartFile image
    ) {
        eventService.create(eventCreateDto, image);
        return new ResponseEntity<>(CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> update(
            @PathVariable Integer id,
            @Validated @RequestPart("event") EventEditDto eventEditDto,
            @RequestPart(value = "image", required = false) MultipartFile image
    ) {
        eventService.update(id, eventEditDto, image);
        return new ResponseEntity<>(OK);
    }

    @PostMapping("/{id}/register")
    public ResponseEntity<Void> registerForEvent(@PathVariable Integer id) {
        eventUserService.registerForEvent(id);
        return new ResponseEntity<>(CREATED);
    }

    @DeleteMapping("/{id}/unregister")
    public ResponseEntity<Void> unregisterFromEvent(@PathVariable Integer id) {
        eventUserService.unregisterFromEvent(id);
        return new ResponseEntity<>(NO_CONTENT);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removeEvent(@PathVariable Integer id) {
        eventService.delete(id);
        return new ResponseEntity<>(NO_CONTENT);
    }
}
