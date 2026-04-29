package ru.alex.eventspaceapi.mapper.program;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import ru.alex.eventspaceapi.database.entity.Program;
import ru.alex.eventspaceapi.dto.program.ProgramReadDto;

@Mapper(componentModel = "spring")
public interface ProgramReadMapper {
    @Mapping(target = "building", source = "building.name")
    ProgramReadDto toDto(Program program);
}
