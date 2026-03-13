package ru.alex.eventspaceapi.mapper.eventCategory;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import ru.alex.eventspaceapi.database.entity.EventCategory;
import ru.alex.eventspaceapi.dto.eventCategory.EventCategoryCreateDto;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface EventCategoryCreateMapper {
    EventCategory toEntity(EventCategoryCreateDto dto);
}
