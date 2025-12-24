package ru.alex.eventspaceapi.dto.filter;

import java.util.List;

public record EventPreviewFilter(
        String name,
        List<Integer> categories,
        String sort,
        String period,
        Integer page
) {
}
