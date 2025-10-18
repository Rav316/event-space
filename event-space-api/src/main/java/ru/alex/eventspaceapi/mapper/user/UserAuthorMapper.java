package ru.alex.eventspaceapi.mapper.user;

import org.mapstruct.Mapper;
import ru.alex.eventspaceapi.database.entity.User;
import ru.alex.eventspaceapi.dto.user.UserAuthorDto;

@Mapper(componentModel = "spring")
public interface UserAuthorMapper {
    UserAuthorDto toDto(User user);
}
