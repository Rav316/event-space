package ru.alex.eventspaceapi.dto.program;

import java.util.List;

public record ProgramListDto(
        Integer id,
        String name,
        List<Integer> preferredCategoryIds
) {
}
