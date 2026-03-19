package ru.alex.eventspaceapi.mapper.user;

import org.mapstruct.Mapper;
import ru.alex.eventspaceapi.database.entity.User;
import ru.alex.eventspaceapi.dto.user.UserAdminListDto;

@Mapper(componentModel = "spring")
public interface UserListMapper {
    UserAdminListDto toDto(User user);
}
