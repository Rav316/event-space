package ru.alex.eventspaceapi.exception;

import jakarta.persistence.EntityNotFoundException;

public class EventNotFoundException extends EntityNotFoundException {
    public EventNotFoundException(Integer id) {
        super("event with id " + id + " not found");
    }
}
