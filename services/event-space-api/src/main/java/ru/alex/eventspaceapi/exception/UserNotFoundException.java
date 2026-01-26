package ru.alex.eventspaceapi.exception;

import jakarta.persistence.EntityNotFoundException;

public class UserNotFoundException extends EntityNotFoundException {
    public UserNotFoundException(Integer id) {
        super("user with id " + id + " not found");
    }
}
