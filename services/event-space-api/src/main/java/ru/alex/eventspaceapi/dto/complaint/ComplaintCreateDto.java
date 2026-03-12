package ru.alex.eventspaceapi.dto.complaint;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record ComplaintCreateDto(
        @NotNull
        String target,
        @NotNull
        Integer complaintType,
        @Size(max = 500)
        String description
) {
}
