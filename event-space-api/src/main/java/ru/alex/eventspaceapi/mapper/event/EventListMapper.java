package ru.alex.eventspaceapi.mapper.event;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import ru.alex.eventspaceapi.database.entity.Event;
import ru.alex.eventspaceapi.database.entity.User;
import ru.alex.eventspaceapi.dto.event.EventListDto;
import ru.alex.eventspaceapi.dto.user.UserDetailsDto;
import ru.alex.eventspaceapi.mapper.eventCategory.EventCategoryReadMapper;
import ru.alex.eventspaceapi.mapper.space.SpaceReadMapper;

import java.time.LocalDate;
import java.time.LocalTime;

import static ru.alex.eventspaceapi.util.AuthUtils.getAuthorizedUser;

@Mapper(
        componentModel = "spring",
        uses = {
                EventCategoryReadMapper.class,
                SpaceReadMapper.class
        }
)
public interface EventListMapper {
    @Mapping(target = "participantQuantity", source = "event", qualifiedByName = "mapParticipantsQuantity")
    @Mapping(target = "isRegistered", source = "event", qualifiedByName = "mapIsRegistered")
    @Mapping(target = "author", source = "event", qualifiedByName = "mapAuthor")
    @Mapping(target = "canRegister", source = "event", qualifiedByName = "mapCanRegister")
    @Mapping(target = "canUnregister", source = "event", qualifiedByName = "mapCanUnregister")
    EventListDto toDto(Event event);

    @Named("mapParticipantsQuantity")
    default Integer mapParticipantsQuantity(Event event) {
        return event.getUsers().size();
    }

    @Named("mapIsRegistered")
    default Boolean mapIsRegistered(Event event) {
        UserDetailsDto user = getAuthorizedUser();
        return user != null && event.getUsers().stream().anyMatch(u -> u.getId().equals(user.id()));
    }

    @Named("mapAuthor")
    default String mapAuthor(Event event) {
        User author = event.getAuthor();
        if(author == null) {
            return null;
        }
        return author.getFirstName() + " " + author.getLastName();
    }

    @Named("mapCanRegister")
    default Boolean mapCanRegister(Event event) {
        LocalDate now = LocalDate.now();
        return event.getEventDate().isAfter(now) ||
                (event.getEventDate().equals(now) && event.getStartTime().isAfter(LocalTime.now()));
    }

    @Named("mapCanUnregister")
    default boolean mapCanUnregister(Event event) {
        LocalDate now = LocalDate.now();
        return event.getEventDate().isAfter(now) ||
                (event.getEventDate().equals(now) && event.getEndTime().isAfter(LocalTime.now()));
    }
}
