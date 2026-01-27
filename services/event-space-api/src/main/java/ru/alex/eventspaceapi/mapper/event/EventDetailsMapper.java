package ru.alex.eventspaceapi.mapper.event;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import ru.alex.eventspaceapi.database.entity.Event;
import ru.alex.eventspaceapi.database.entity.EventStep;
import ru.alex.eventspaceapi.dto.event.EventDetailsDto;
import ru.alex.eventspaceapi.dto.user.UserDetailsDto;
import ru.alex.eventspaceapi.mapper.eventStep.EventStepReadMapper;
import ru.alex.eventspaceapi.model.Role;
import ru.alex.eventspaceapi.util.EventUtils;

import java.util.List;

import static ru.alex.eventspaceapi.util.AuthUtils.getAuthorizedUser;

@Mapper(
        componentModel = "spring",
        uses = {EventStepReadMapper.class}
)
public interface EventDetailsMapper {
    @Mapping(target = "building", source = "event.space.building.id")
    @Mapping(target = "category", source = "event.category.id")
    @Mapping(target = "space", source = "event.space.id")
    @Mapping(target = "registeredUsers", source = "event", qualifiedByName = "mapRegisteredUsers")
    @Mapping(target = "canModify", source = "event", qualifiedByName = "mapCanModify")
    EventDetailsDto toDto(Event event, List<EventStep> steps);

    @Named("mapRegisteredUsers")
    default Integer mapRegisteredUsers(Event event) {
        return event.getEventUsers().size();
    }


    @Named("mapCanModify")
    default Boolean mapCanModify(Event event) {
        UserDetailsDto user = getAuthorizedUser();
        if (user == null) return false;
        return (event.getAuthor().getId().equals(user.id()) &&
                !EventUtils.isEventStarted(event) && !EventUtils.isEventPassed(event)) ||
                user.role() == Role.ADMIN;
    }

}
