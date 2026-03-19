package ru.alex.eventspaceapi.mapper.building;

import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.ReportingPolicy;
import ru.alex.eventspaceapi.database.entity.Building;
import ru.alex.eventspaceapi.dto.building.BuildingEditDto;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface BuildingEditMapper {
    void updateFromEntity(BuildingEditDto dto, @MappingTarget Building entity);
}
