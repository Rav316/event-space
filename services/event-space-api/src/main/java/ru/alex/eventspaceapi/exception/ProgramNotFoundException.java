package ru.alex.eventspaceapi.exception;

import jakarta.persistence.EntityNotFoundException;

public class ProgramNotFoundException extends EntityNotFoundException {
    public ProgramNotFoundException(Integer id) {
        super("program with id " + id + " not found");
    }
}
