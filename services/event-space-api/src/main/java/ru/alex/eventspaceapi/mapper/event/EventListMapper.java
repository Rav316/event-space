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
    @Mapping(target = "registeredUsers", source = "event", qualifiedByName = "mapRegisteredUsers")
    @Mapping(target = "isRegistered", source = "event", qualifiedByName = "mapIsRegistered")
    @Mapping(target = "author", source = "event", qualifiedByName = "mapAuthor")
    @Mapping(target = "canRegister", source = "event", qualifiedByName = "mapCanRegister")
    @Mapping(target = "canUnregister", source = "event", qualifiedByName = "mapCanUnregister")
    @Mapping(target = "isAttended", source = "event", qualifiedByName = "mapIsAttended")
    @Mapping(target = "qrToken", source = "event", qualifiedByName = "mapQrToken")
    EventListDto toDto(Event event);

    @Named("mapRegisteredUsers")
    default Long mapRegisteredUsers(Event event) {
        return event.getRegisteredUsers();
    }

    @Named("mapIsRegistered")
    default Boolean mapIsRegistered(Event event) {
        UserDetailsDto user = getAuthorizedUser();
        if (user == null) return false;

        return event.getCurrentUserStatus() != null;
    }

    @Named("mapIsAttended")
    default Boolean mapIsAttended(Event event) {
        UserDetailsDto user = getAuthorizedUser();
        if (user == null) return false;

        return event.getCurrentUserStatus() != null && event.getCurrentUserStatus().getAttended();
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

        return event.getCurrentUserStatus() != null && !event.getCurrentUserStatus().getAttended();
    }

    @Named("mapQrToken")
    default String mapQrToken(Event event) {
        UserDetailsDto user = getAuthorizedUser();
        if (user == null || event.getCurrentUserStatus() == null) return null;

        return event.getCurrentUserStatus().getQrToken().toString();
    }
}
