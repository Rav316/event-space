package ru.alex.eventspaceapi.mapper.user;

import org.mapstruct.*;
import ru.alex.eventspaceapi.database.entity.Program;
import ru.alex.eventspaceapi.database.entity.User;
import ru.alex.eventspaceapi.dto.user.UserEditDto;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface UserEditMapper {
    @Mapping(target = "program", source = "program", qualifiedByName = "mapProgram")
    @Mapping(target = "notificationCategories", ignore = true)
    void updateFromEntity(UserEditDto dto, @MappingTarget User entity);

    @Named("mapProgram")
    default Program mapProgram(Integer programId) {
        Program program = new Program();
        program.setId(programId);
        return program;
    }
}
