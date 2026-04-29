package ru.alex.eventspaceapi.mapper.user;

import org.mapstruct.Mapper;
import ru.alex.eventspaceapi.database.entity.User;
import ru.alex.eventspaceapi.dto.user.UserReadDto;
import ru.alex.eventspaceapi.mapper.program.ProgramListMapper;

@Mapper(componentModel = "spring", uses = ProgramListMapper.class)
public interface UserReadMapper {
    UserReadDto toDto(User entity);
}
