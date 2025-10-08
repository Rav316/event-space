package ru.alex.eventspaceapi.mapper.eventStep;

import org.mapstruct.Mapper;
import ru.alex.eventspaceapi.database.entity.EventStep;
import ru.alex.eventspaceapi.dto.eventStep.EventStepReadDto;

@Mapper(componentModel = "spring")
public interface EventStepReadMapper {
    EventStepReadDto toDto(EventStep eventStep);
}
