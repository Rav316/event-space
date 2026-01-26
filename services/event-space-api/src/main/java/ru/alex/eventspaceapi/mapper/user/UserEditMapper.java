package ru.alex.eventspaceapi.mapper.user;

import org.mapstruct.*;
import ru.alex.eventspaceapi.database.entity.Faculty;
import ru.alex.eventspaceapi.database.entity.User;
import ru.alex.eventspaceapi.dto.user.UserEditDto;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface UserEditMapper {
    @Mapping(target = "faculty", source = "faculty", qualifiedByName = "mapFaculty")
    void updateFromEntity(UserEditDto dto, @MappingTarget User entity);

    @Named("mapFaculty")
    default Faculty mapFaculty(Integer facultyId) {
        Faculty faculty = new Faculty();
        faculty.setId(facultyId);
        return faculty;
    }
}
