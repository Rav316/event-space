package ru.alex.eventspaceapi.dto.complaint;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import ru.alex.eventspaceapi.model.ComplaintTargetType;
import ru.alex.eventspaceapi.validation.EnumIndex;

public record ComplaintCreateDto(
        @NotNull
        @EnumIndex(enumClass = ComplaintTargetType.class)
        Integer targetType,
        @NotNull
        Integer targetId,
        @NotNull
        Integer complaintType,
        @Size(max = 500)
        String description
) {
}
