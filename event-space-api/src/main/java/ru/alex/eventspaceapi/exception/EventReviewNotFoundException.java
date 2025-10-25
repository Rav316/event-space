package ru.alex.eventspaceapi.exception;

import jakarta.persistence.EntityNotFoundException;

public class EventReviewNotFoundException extends EntityNotFoundException {
    public EventReviewNotFoundException(Integer id) {
        super("event review with id " + id + " not found");
    }
}
