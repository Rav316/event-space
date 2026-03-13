package ru.alex.eventspaceapi.mapper.space;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.ReportingPolicy;
import ru.alex.eventspaceapi.database.entity.Space;
import ru.alex.eventspaceapi.dto.space.SpaceEditDto;
import ru.alex.eventspaceapi.mapper.NullableValueMapper;

@Mapper(
        componentModel = "spring",
        unmappedTargetPolicy = ReportingPolicy.IGNORE,
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE,
        uses = {NullableValueMapper.class}
)
public interface SpaceEditMapper {
    @Mapping(target = "building", ignore = true)
    @Mapping(target = "type", ignore = true)
    void updateFromDto(SpaceEditDto dto, @MappingTarget Space entity);
}
