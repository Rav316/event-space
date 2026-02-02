package ru.alex.eventspaceapi.database.repository;

import ru.alex.eventspaceapi.dto.user.TopOrganizerDto;

import java.util.List;

public interface UserRepositoryCustom {
    List<TopOrganizerDto> getTopOrganizers();
}
