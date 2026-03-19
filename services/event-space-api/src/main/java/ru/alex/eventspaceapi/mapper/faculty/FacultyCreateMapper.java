package ru.alex.eventspaceapi.mapper.faculty;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import ru.alex.eventspaceapi.database.entity.Faculty;
import ru.alex.eventspaceapi.dto.faculty.FacultyCreateDto;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface FacultyCreateMapper {
    @Mapping(target = "building", ignore = true)
    Faculty toEntity(FacultyCreateDto dto);
}
