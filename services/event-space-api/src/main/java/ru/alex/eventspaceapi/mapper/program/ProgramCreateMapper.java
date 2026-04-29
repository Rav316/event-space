package ru.alex.eventspaceapi.mapper.program;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import ru.alex.eventspaceapi.database.entity.Program;
import ru.alex.eventspaceapi.dto.program.ProgramCreateDto;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ProgramCreateMapper {
    @Mapping(target = "building", ignore = true)
    Program toEntity(ProgramCreateDto dto);
}
