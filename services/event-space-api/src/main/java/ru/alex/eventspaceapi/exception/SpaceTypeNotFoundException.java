package ru.alex.eventspaceapi.exception;

import jakarta.persistence.EntityNotFoundException;

public class SpaceTypeNotFoundException extends EntityNotFoundException {
    public SpaceTypeNotFoundException(Integer id) {
        super("space type with id " + id + " not found");
    }
}
