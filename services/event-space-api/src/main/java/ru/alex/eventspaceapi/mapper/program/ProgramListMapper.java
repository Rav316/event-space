package ru.alex.eventspaceapi.mapper.program;

import org.mapstruct.Mapper;
import ru.alex.eventspaceapi.database.entity.Program;
import ru.alex.eventspaceapi.dto.program.ProgramListDto;

@Mapper(componentModel = "spring")
public interface ProgramListMapper {
    ProgramListDto toDto(Program program);
}
