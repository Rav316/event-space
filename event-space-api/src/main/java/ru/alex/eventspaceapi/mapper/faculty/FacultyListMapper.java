package ru.alex.eventspaceapi.mapper.faculty;

import org.mapstruct.Mapper;
import ru.alex.eventspaceapi.database.entity.Faculty;
import ru.alex.eventspaceapi.dto.faculty.FacultyListDto;

@Mapper(componentModel = "spring")
public interface FacultyListMapper {
    FacultyListDto toDto(Faculty faculty);
}
