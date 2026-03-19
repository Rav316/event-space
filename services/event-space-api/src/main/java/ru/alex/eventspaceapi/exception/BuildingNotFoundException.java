package ru.alex.eventspaceapi.exception;

import jakarta.persistence.EntityNotFoundException;

public class BuildingNotFoundException extends EntityNotFoundException {
    public BuildingNotFoundException(Integer id) {
        super("building with id " + id + " not found");
    }
}
