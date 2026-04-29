package ru.alex.eventspaceapi.mapper.user;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import ru.alex.eventspaceapi.database.entity.Program;
import ru.alex.eventspaceapi.database.entity.User;
import ru.alex.eventspaceapi.dto.user.UserEventAuthorDto;

@Mapper(componentModel = "spring")
public interface UserEventAuthorMapper {
    @Mapping(target = "program", source = "program", qualifiedByName = "mapProgram")
    UserEventAuthorDto toDto(User user);

    @Named("mapProgram")
    default String mapProgram(Program program) {
        return program.getName();
    }
}
