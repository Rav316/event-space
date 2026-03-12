package ru.alex.eventspaceapi.dto.filter;

public record AdminListFilter(
        Integer page,
        Integer size,
        String search
) {
}
