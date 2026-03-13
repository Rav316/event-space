package ru.alex.eventspaceapi.exception;

import jakarta.persistence.EntityNotFoundException;

public class ComplaintNotFoundException extends EntityNotFoundException {
    public ComplaintNotFoundException(Integer id) {
        super("complaint with id " + id + " not found");
    }
}
