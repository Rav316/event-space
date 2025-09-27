package ru.alex.eventspaceapi.mapper.eventCategory;

import org.mapstruct.Mapper;
import ru.alex.eventspaceapi.database.entity.EventCategory;
import ru.alex.eventspaceapi.dto.EventCategory.EventCategoryReadDto;

@Mapper(componentModel = "spring")
public interface EventCategoryReadMapper {
    EventCategoryReadDto toDto(EventCategory entity);
}
