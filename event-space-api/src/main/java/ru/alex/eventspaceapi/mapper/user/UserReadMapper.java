package ru.alex.eventspaceapi.mapper.user;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import ru.alex.eventspaceapi.database.entity.User;
import ru.alex.eventspaceapi.dto.user.UserReadDto;

@Mapper(componentModel = "spring")
public interface UserReadMapper {
    @Mapping(target = "faculty", source = "faculty.id")
    UserReadDto toDto(User entity);
}
