package ru.alex.eventspaceapi.http.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ru.alex.eventspaceapi.dto.eventCategory.EventCategoryCountDto;
import ru.alex.eventspaceapi.dto.eventCategory.EventCategoryCreateDto;
import ru.alex.eventspaceapi.dto.eventCategory.EventCategoryDeleteImpactDto;
import ru.alex.eventspaceapi.dto.eventCategory.EventCategoryEditDto;
import ru.alex.eventspaceapi.dto.eventCategory.EventCategoryReadDto;
import ru.alex.eventspaceapi.service.EventCategoryService;

import java.util.List;

import static org.springframework.http.HttpStatus.*;

@RestController
@RequestMapping("/api/event-categories")
@RequiredArgsConstructor
public class EventCategoryController {
    private final EventCategoryService eventCategoryService;

    @GetMapping
    public List<EventCategoryReadDto> findAll() {
        return eventCategoryService.findAll();
    }

    @GetMapping("/exists-by-name")
    public ResponseEntity<Boolean> existsByName(@RequestParam(name = "name") String name) {
        return new ResponseEntity<>(eventCategoryService.existsByName(name), OK);
    }

    @GetMapping("/with-event-count")
    public List<EventCategoryCountDto> findAllWithEventCount() {
        return eventCategoryService.findAllCategoriesWithEventCount();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<EventCategoryReadDto> create(
            @Validated @RequestBody EventCategoryCreateDto eventCategoryCreateDto
    ) {
        return new ResponseEntity<>(eventCategoryService.create(eventCategoryCreateDto), CREATED);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<EventCategoryReadDto> update(
            @PathVariable Integer id,
            @Validated @RequestBody EventCategoryEditDto eventCategoryEditDto
    ) {
        return new ResponseEntity<>(eventCategoryService.update(id, eventCategoryEditDto), OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/{id}/delete-impact")
    public ResponseEntity<EventCategoryDeleteImpactDto> getDeleteImpact(@PathVariable Integer id) {
        return new ResponseEntity<>(eventCategoryService.getDeleteImpact(id), OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        eventCategoryService.delete(id);
        return new ResponseEntity<>(NO_CONTENT);
    }
}
