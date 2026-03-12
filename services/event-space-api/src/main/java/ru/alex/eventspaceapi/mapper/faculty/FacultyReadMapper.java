package ru.alex.eventspaceapi.mapper.faculty;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import ru.alex.eventspaceapi.database.entity.Faculty;
import ru.alex.eventspaceapi.dto.faculty.FacultyReadDto;

@Mapper(componentModel = "spring")
public interface FacultyReadMapper {
    @Mapping(target = "building", source = "building.name")
    FacultyReadDto toDto(Faculty faculty);
}
