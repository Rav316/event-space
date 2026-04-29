package ru.alex.eventspaceapi.dto.user;

import com.fasterxml.jackson.annotation.JsonInclude;
import ru.alex.eventspaceapi.dto.program.ProgramListDto;

import java.time.LocalDate;
import java.util.List;

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
        List<Integer> notificationCategoryIds,
        boolean emailNotificationsEnabled,
        boolean active,
        LocalDate registerDate,
        ProgramListDto program
) {
}
