package ru.alex.eventspaceapi.mapper.space;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import ru.alex.eventspaceapi.database.entity.Space;
import ru.alex.eventspaceapi.dto.space.SpaceCreateDto;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface SpaceCreateMapper {
    @Mapping(target = "building", ignore = true)
    @Mapping(target = "type", ignore = true)
    Space toEntity(SpaceCreateDto dto);
}
