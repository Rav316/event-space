package ru.alex.eventspaceapi.mapper.event;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import ru.alex.eventspaceapi.database.entity.Event;
import ru.alex.eventspaceapi.database.entity.EventStep;
import ru.alex.eventspaceapi.dto.event.EventDetailsDto;
import ru.alex.eventspaceapi.mapper.eventStep.EventStepReadMapper;

import java.util.List;

@Mapper(
        componentModel = "spring",
        uses = {EventStepReadMapper.class}
)
public interface EventDetailsMapper {
    @Mapping(target = "building", source = "event.space.building.id")
    @Mapping(target = "category", source = "event.category.id")
    @Mapping(target = "space", source = "event.space.id")
    @Mapping(target = "registeredUsers", source = "event", qualifiedByName = "mapRegisteredUsers")
    EventDetailsDto toDto(Event event, List<EventStep> steps);

    @Named("mapRegisteredUsers")
    default Integer mapRegisteredUsers(Event event) {
        return event.getEventUsers().size();
    }
}
