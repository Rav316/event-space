package ru.alex.eventspaceapi.exception;

import jakarta.persistence.EntityNotFoundException;

public class FacultyNotFoundException extends EntityNotFoundException {
    public FacultyNotFoundException(Integer id) {
        super("faculty with id " + id + " not found");
    }
}
