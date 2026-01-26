package ru.alex.eventspaceapi.mapper.user;

import org.mapstruct.Mapper;
import ru.alex.eventspaceapi.database.entity.User;
import ru.alex.eventspaceapi.dto.user.UserReadDto;
import ru.alex.eventspaceapi.mapper.faculty.FacultyListMapper;

@Mapper(componentModel = "spring", uses = FacultyListMapper.class)
public interface UserReadMapper {
    UserReadDto toDto(User entity);
}
