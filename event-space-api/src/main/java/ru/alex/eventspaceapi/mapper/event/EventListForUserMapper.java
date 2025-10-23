package ru.alex.eventspaceapi.mapper.event;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import ru.alex.eventspaceapi.database.entity.EventUser;
import ru.alex.eventspaceapi.dto.event.EventListForUserDto;
import ru.alex.eventspaceapi.mapper.space.SpaceReadMapper;

@Mapper(componentModel = "spring", uses = {
        SpaceReadMapper.class
})
public interface EventListForUserMapper {
    @Mapping(target = "id", source = "eventUser.event.id")
    @Mapping(target = "name", source = "eventUser.event.name")
    @Mapping(target = "eventDate", source = "eventUser.event.eventDate")
    @Mapping(target = "startTime", source = "eventUser.event.startTime")
    @Mapping(target = "endTime", source = "eventUser.event.endTime")
    @Mapping(target = "space", source = "eventUser.event.space")
    EventListForUserDto toDto(EventUser eventUser);
}
