package ru.alex.eventspaceapi.mapper.faculty;

import org.mapstruct.Mapper;
import ru.alex.eventspaceapi.database.entity.Faculty;
import ru.alex.eventspaceapi.dto.faculty.FacultyAuthDto;

@Mapper(componentModel = "spring")
public interface FacultyAuthMapper {
    FacultyAuthDto toDto(Faculty faculty);
}
