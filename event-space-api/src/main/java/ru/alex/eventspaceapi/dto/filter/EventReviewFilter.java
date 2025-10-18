package ru.alex.eventspaceapi.dto.filter;

public record EventReviewFilter(
        Short rating,
        String sort,
        Integer page
) {
}
