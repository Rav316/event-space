package ru.alex.eventspaceapi.dto.filter;

public record EventMyFilter (
        Integer page,
        String name,
        Integer category
) {
}
