package ru.alex.eventspaceapi.mapper.spaceType;

import org.mapstruct.Mapper;
import ru.alex.eventspaceapi.database.entity.SpaceType;
import ru.alex.eventspaceapi.dto.spaceType.SpaceTypeReadDto;

@Mapper(componentModel = "spring")
public interface SpaceTypeReadMapper {
    SpaceTypeReadDto toDto(SpaceType spaceType);
}
