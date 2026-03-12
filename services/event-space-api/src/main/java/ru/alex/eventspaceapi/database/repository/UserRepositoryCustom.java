package ru.alex.eventspaceapi.database.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import ru.alex.eventspaceapi.database.entity.User;
import ru.alex.eventspaceapi.dto.filter.UserFilter;
import ru.alex.eventspaceapi.dto.user.TopOrganizerDto;

import java.util.List;

public interface UserRepositoryCustom {
    Page<User> findAll(UserFilter filter, Sort sort);
    List<TopOrganizerDto> getTopOrganizers();
}
