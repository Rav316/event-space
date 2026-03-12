package ru.alex.eventspaceapi.mapper.event;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import ru.alex.eventspaceapi.database.entity.Event;
import ru.alex.eventspaceapi.database.entity.User;
import ru.alex.eventspaceapi.dto.event.EventAdminListDto;
import ru.alex.eventspaceapi.mapper.eventCategory.EventCategoryReadMapper;
import ru.alex.eventspaceapi.mapper.space.SpaceReadMapper;
import ru.alex.eventspaceapi.model.EventStatus;

import java.time.LocalDate;
import java.time.LocalTime;

@Mapper(
        componentModel = "spring",
        uses = {
                EventCategoryReadMapper.class,
                SpaceReadMapper.class
        }
)
public interface EventAdminListMapper {
    @Mapping(target = "registeredUsers", source = "event", qualifiedByName = "mapRegisteredUsers")
    @Mapping(target = "author", source = "event", qualifiedByName = "mapAuthor")
    @Mapping(target = "status", source = "event", qualifiedByName = "mapStatus")
    EventAdminListDto toDto(Event event);

    @Named("mapRegisteredUsers")
    default Long mapRegisteredUsers(Event event) {
        return event.getRegisteredUsers();
    }

    @Named("mapAuthor")
    default String mapAuthor(Event event) {
        User author = event.getAuthor();
        if (author == null) return null;
        return author.getFirstName() + " " + author.getLastName();
    }

    @Named("mapStatus")
    default Integer mapStatus(Event event) {
        LocalDate today = LocalDate.now();
        LocalTime now = LocalTime.now();
        LocalDate date = event.getEventDate();
        LocalTime start = event.getStartTime();
        LocalTime end = event.getEndTime();

        if (date == null) return null;

        if (date.isBefore(today) || (date.isEqual(today) && end != null && end.isBefore(now))) {
            return EventStatus.PAST.ordinal();
        }
        if (date.isEqual(today) && start != null && !start.isAfter(now)) {
            return EventStatus.ONGOING.ordinal();
        }
        return EventStatus.UPCOMING.ordinal();
    }
}
