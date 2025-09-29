package ru.alex.eventspaceapi.mapper.event;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import ru.alex.eventspaceapi.database.entity.Event;
import ru.alex.eventspaceapi.dto.event.EventListDto;
import ru.alex.eventspaceapi.mapper.eventCategory.EventCategoryReadMapper;
import ru.alex.eventspaceapi.mapper.space.SpaceReadMapper;

@Mapper(
        componentModel = "spring",
        uses = {
                EventCategoryReadMapper.class,
                SpaceReadMapper.class
        }
)
public interface EventListMapper {
    @Mapping(target = "participantQuantity", source = "event", qualifiedByName = "mapParticipantsQuantity")
    EventListDto toDto(Event event);

    @Named("mapParticipantsQuantity")
    default Integer mapParticipantsQuantity(Event event) {
        return event.getUsers().size();
    }
}
