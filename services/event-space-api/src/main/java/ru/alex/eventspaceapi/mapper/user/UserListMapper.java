package ru.alex.eventspaceapi.mapper.user;

import org.mapstruct.Mapper;
import ru.alex.eventspaceapi.database.entity.User;
import ru.alex.eventspaceapi.dto.user.UserListDto;

@Mapper(componentModel = "spring")
public interface UserListMapper {
    UserListDto toDto(User user);
}
