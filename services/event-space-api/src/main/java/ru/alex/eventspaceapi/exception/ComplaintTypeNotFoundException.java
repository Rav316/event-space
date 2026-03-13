package ru.alex.eventspaceapi.exception;

import jakarta.persistence.EntityNotFoundException;

public class ComplaintTypeNotFoundException extends EntityNotFoundException {
    public ComplaintTypeNotFoundException(Integer id) {
        super("complaint type with id " + id + " not found");
    }
}
