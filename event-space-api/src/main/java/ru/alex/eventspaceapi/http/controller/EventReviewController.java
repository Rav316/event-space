package ru.alex.eventspaceapi.http.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.alex.eventspaceapi.service.HelpfulMarkService;

import static org.springframework.http.HttpStatus.NO_CONTENT;
import static org.springframework.http.HttpStatus.OK;

@RestController
@RequestMapping("/api/event-reviews")
@RequiredArgsConstructor
public class EventReviewController {
    private final HelpfulMarkService helpfulMarkService;

    @PostMapping("/{id}/mark-as-helpful")
    public ResponseEntity<Void> markReviewAsHelpful(@PathVariable("id") Integer id) {
        helpfulMarkService.markReviewAsHelpful(id);
        return new ResponseEntity<>(OK);
    }

    @DeleteMapping("/{id}/unmark-as-helpful")
    public ResponseEntity<Void> unmarkReviewAsHelpful(@PathVariable("id") Integer id) {
        helpfulMarkService.unmarkReviewAsHelpful(id);
        return new ResponseEntity<>(NO_CONTENT);
    }
}
