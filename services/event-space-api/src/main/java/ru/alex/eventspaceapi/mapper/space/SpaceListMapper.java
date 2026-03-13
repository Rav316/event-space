package ru.alex.eventspaceapi.mapper.space;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import ru.alex.eventspaceapi.database.entity.Space;
import ru.alex.eventspaceapi.dto.space.SpaceListDto;

@Mapper(componentModel = "spring")
public interface SpaceListMapper {
    @Mapping(target = "building", source = "building.id")
    @Mapping(target = "typeId", source = "type.id")
    @Mapping(target = "type", source = "type.name")
    SpaceListDto toDto(Space space);
}
