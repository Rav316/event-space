package ru.alex.eventspaceapi.mapper.event;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import ru.alex.eventspaceapi.database.entity.Event;
import ru.alex.eventspaceapi.database.entity.EventUser;
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
    @Mapping(target = "registeredUsers", source = "event", qualifiedByName = "mapRegisteredUsers")
    @Mapping(target = "isRegistered", source = "event", qualifiedByName = "mapIsRegistered")
    @Mapping(target = "author", source = "event", qualifiedByName = "mapAuthor")
    @Mapping(target = "canRegister", source = "event", qualifiedByName = "mapCanRegister")
    @Mapping(target = "canUnregister", source = "event", qualifiedByName = "mapCanUnregister")
    @Mapping(target = "isAttended", source = "event", qualifiedByName = "mapIsAttended")
    EventListDto toDto(Event event);

    @Named("mapRegisteredUsers")
    default Integer mapRegisteredUsers(Event event) {
        return event.getEventUsers().size();
    }

    @Named("mapIsRegistered")
    default Boolean mapIsRegistered(Event event) {
        UserDetailsDto user = getAuthorizedUser();
        if (user == null) return false;

        return event.getEventUsers().stream()
                .anyMatch(eu -> eu.getUser().getId().equals(user.id()));
    }

    @Named("mapIsAttended")
    default Boolean mapIsAttended(Event event) {
        UserDetailsDto user = getAuthorizedUser();
        if (user == null) return false;

        return event.getEventUsers().stream()
                .filter(eu -> eu.getUser().getId().equals(user.id()))
                .findFirst()
                .map(EventUser::getAttended)
                .orElse(false);
    }

    @Named("mapAuthor")
    default String mapAuthor(Event event) {
        User author = event.getAuthor();
        if (author == null) return null;
        return author.getFirstName() + " " + author.getLastName();
    }

    @Named("mapCanRegister")
    default Boolean mapCanRegister(Event event) {
        UserDetailsDto user = getAuthorizedUser();
        if (user == null) return false;

        LocalDate now = LocalDate.now();
        LocalTime timeNow = LocalTime.now();

        return event.getEventDate().isAfter(now)
                || (event.getEventDate().equals(now) && event.getStartTime().isAfter(timeNow));
    }

    @Named("mapCanUnregister")
    default Boolean mapCanUnregister(Event event) {
        UserDetailsDto user = getAuthorizedUser();
        if (user == null) return false;

        LocalDate now = LocalDate.now();
        LocalTime timeNow = LocalTime.now();

        boolean eventNotEnded = event.getEventDate().isAfter(now)
                || (event.getEventDate().equals(now) && event.getEndTime().isAfter(timeNow));

        if (!eventNotEnded) {
            return false;
        }

        return event.getEventUsers().stream()
                .filter(eu -> eu.getUser().getId().equals(user.id()))
                .findFirst()
                .map(eu -> !eu.getAttended())
                .orElse(false);
    }
}
