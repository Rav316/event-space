package ru.alex.eventspaceapi.mapper.event;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import ru.alex.eventspaceapi.database.entity.Event;
import ru.alex.eventspaceapi.database.entity.User;
import ru.alex.eventspaceapi.dto.event.EventListMyDto;
import ru.alex.eventspaceapi.mapper.eventCategory.EventCategoryReadMapper;
import ru.alex.eventspaceapi.mapper.space.SpaceReadMapper;

@Mapper(
        componentModel = "spring",
        uses = {
                EventCategoryReadMapper.class,
                SpaceReadMapper.class
        }
)
public interface EventListMyMapper {
    @Mapping(target = "registeredUsers", source = "event", qualifiedByName = "mapRegisteredUsers")
    @Mapping(target = "author", source = "event", qualifiedByName = "mapAuthor")
    EventListMyDto toDto(Event event);

    @Named("mapRegisteredUsers")
    default Integer mapRegisteredUsers(Event event) {
        return event.getEventUsers().size();
    }

    @Named("mapAuthor")
    default String mapAuthor(Event event) {
        User author = event.getAuthor();
        if (author == null) return null;
        return author.getFirstName() + " " + author.getLastName();
    }
}
