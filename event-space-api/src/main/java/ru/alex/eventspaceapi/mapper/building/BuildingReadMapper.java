package ru.alex.eventspaceapi.mapper.building;

import org.mapstruct.Mapper;
import ru.alex.eventspaceapi.database.entity.Building;
import ru.alex.eventspaceapi.dto.building.BuildingReadDto;

@Mapper(componentModel = "spring")
public interface BuildingReadMapper {
    BuildingReadDto toDto(Building building);
}
