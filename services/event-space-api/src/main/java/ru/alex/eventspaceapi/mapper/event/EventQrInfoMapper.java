package ru.alex.eventspaceapi.mapper.event;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import ru.alex.eventspaceapi.database.entity.Event;
import ru.alex.eventspaceapi.dto.event.EventQrInfoDto;

@Mapper(componentModel = "spring")
public interface EventQrInfoMapper {
    @Mapping(target = "date", source = "eventDate")
    @Mapping(target = "space", source = "event.space.name")
    @Mapping(target = "address", source = "event.space.building.address")
    EventQrInfoDto toDto(Event event);
}
