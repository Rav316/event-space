package ru.alex.eventspaceapi.dto.user;

import com.fasterxml.jackson.annotation.JsonInclude;
import ru.alex.eventspaceapi.dto.faculty.FacultyListDto;

import java.time.LocalDate;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record UserReadDto(
        Integer id,
        String firstName,
        String lastName,
        String email,
        Integer role,
        Short course,
        String description,
        String phone,
        String avatarUrl,
        String tgUsername,
        String vkUrl,
        String githubUrl,
        boolean active,
        LocalDate registerDate,
        FacultyListDto faculty
) {
}
