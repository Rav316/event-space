package ru.alex.eventspaceapi.mapper.building;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import ru.alex.eventspaceapi.database.entity.Building;
import ru.alex.eventspaceapi.dto.building.BuildingCreateDto;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface BuildingCreateMapper {
    Building toEntity(BuildingCreateDto dto);
}
