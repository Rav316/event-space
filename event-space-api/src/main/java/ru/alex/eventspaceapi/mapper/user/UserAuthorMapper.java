package ru.alex.eventspaceapi.mapper.user;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import ru.alex.eventspaceapi.database.entity.Faculty;
import ru.alex.eventspaceapi.database.entity.User;
import ru.alex.eventspaceapi.dto.user.UserAuthorDto;

@Mapper(componentModel = "spring")
public interface UserAuthorMapper {
    @Mapping(target = "faculty", source = "faculty", qualifiedByName = "mapFaculty")
    UserAuthorDto toDto(User user);

    @Named("mapFaculty")
    default String mapFaculty(Faculty faculty) {
        return faculty.getName();
    }
}
