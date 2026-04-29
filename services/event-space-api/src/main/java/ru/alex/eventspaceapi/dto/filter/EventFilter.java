package ru.alex.eventspaceapi.dto.filter;

import java.util.List;

public record EventFilter (
        String name,
        List<Integer> categories,
        List<String> tags,
        Boolean hasPlaces,
        String sort,
        String period,
        Integer page,
        List<Integer> preferredCategoryIds
) {
}
