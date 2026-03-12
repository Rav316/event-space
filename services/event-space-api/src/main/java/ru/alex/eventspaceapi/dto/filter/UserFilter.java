package ru.alex.eventspaceapi.dto.filter;

public record UserFilter (
        Integer page,
        Integer size,
        String search
) {
}
