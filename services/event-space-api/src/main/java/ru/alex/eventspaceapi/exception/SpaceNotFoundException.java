package ru.alex.eventspaceapi.exception;

import jakarta.persistence.EntityNotFoundException;

public class SpaceNotFoundException extends EntityNotFoundException {
    public SpaceNotFoundException(Integer id) {
        super("space with id " + id + " not found");
    }
}
