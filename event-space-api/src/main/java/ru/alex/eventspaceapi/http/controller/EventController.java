package ru.alex.eventspaceapi.http.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import ru.alex.eventspaceapi.dto.event.EventCreateDto;
import ru.alex.eventspaceapi.service.EventService;

import static org.springframework.http.HttpStatus.CREATED;

@RestController
@RequestMapping("/api/events")
@RequiredArgsConstructor
public class EventController {
    private final EventService eventService;

    @PostMapping
    public ResponseEntity<HttpStatus> create(
            @Validated @RequestPart("event")  EventCreateDto eventCreateDto,
            @RequestPart("image") MultipartFile image
    ) {
        eventService.create(eventCreateDto, image);
        return new ResponseEntity<>(CREATED);
    }
}
