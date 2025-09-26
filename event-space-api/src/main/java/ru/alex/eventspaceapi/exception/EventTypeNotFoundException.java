package ru.alex.eventspaceapi.exception;

import jakarta.persistence.EntityNotFoundException;

public class EventTypeNotFoundException extends EntityNotFoundException {
    public EventTypeNotFoundException(Integer id) {
        super("event type with id " + id + " not found");
    }
}
