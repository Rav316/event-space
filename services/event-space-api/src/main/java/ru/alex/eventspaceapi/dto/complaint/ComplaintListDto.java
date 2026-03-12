package ru.alex.eventspaceapi.dto.complaint;

import ru.alex.eventspaceapi.model.ComplaintTargetType;

import java.time.LocalDate;

public record ComplaintListDto(
        Integer id,
        String authorFirstName,
        String authorLastName,
        Integer authorId,
        ComplaintTargetType targetType,
        Integer targetId,
        String targetSnapshot,
        String complaintTypeName,
        String description,
        LocalDate complaintDate,
        Integer status
) {
}
