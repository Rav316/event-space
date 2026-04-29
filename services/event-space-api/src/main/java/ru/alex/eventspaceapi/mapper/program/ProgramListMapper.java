package ru.alex.eventspaceapi.mapper.program;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import ru.alex.eventspaceapi.database.entity.Program;
import ru.alex.eventspaceapi.dto.program.ProgramListDto;

@Mapper(componentModel = "spring")
public interface ProgramListMapper {
    @Mapping(
            target = "preferredCategoryIds",
            expression = "java(program.getPreferredCategories().stream().map(ru.alex.eventspaceapi.database.entity.EventCategory::getId).toList())"
    )
    ProgramListDto toDto(Program program);
}
