package ru.alex.eventspaceapi.mapper.space;

import org.mapstruct.Mapper;
import ru.alex.eventspaceapi.database.entity.Space;
import ru.alex.eventspaceapi.dto.space.SpaceReadDto;
import ru.alex.eventspaceapi.mapper.building.BuildingReadMapper;

@Mapper(
        componentModel = "spring",
        uses = {BuildingReadMapper.class}
)
public interface SpaceReadMapper {
    SpaceReadDto toDto(Space space);
}
