package ru.alex.eventspaceapi.mapper.user;

import org.mapstruct.Mapper;
import ru.alex.eventspaceapi.database.entity.User;
import ru.alex.eventspaceapi.dto.user.UserDetailsDto;

@Mapper(componentModel = "spring")
public interface UserDetailsMapper {
    UserDetailsDto toDto(User user);
}
