package ru.alex.eventspaceapi.mapper.eventType;

import org.mapstruct.Mapper;
import ru.alex.eventspaceapi.database.entity.EventType;
import ru.alex.eventspaceapi.dto.eventType.EventTypeReadDto;

@Mapper(componentModel = "spring")
public interface EventTypeReadMapper {
    EventTypeReadDto toDto(EventType entity);
}
