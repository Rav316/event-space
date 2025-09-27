package ru.alex.eventspaceapi.exception;

import jakarta.persistence.EntityNotFoundException;

public class EventCategoryNotFoundException extends EntityNotFoundException {
    public EventCategoryNotFoundException(Integer id) {
        super("event type with id " + id + " not found");
    }
}
