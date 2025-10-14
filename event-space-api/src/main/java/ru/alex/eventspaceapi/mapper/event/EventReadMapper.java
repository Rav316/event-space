package ru.alex.eventspaceapi.mapper.event;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import ru.alex.eventspaceapi.database.entity.Event;
import ru.alex.eventspaceapi.dto.event.EventReadDto;
import ru.alex.eventspaceapi.dto.user.UserDetailsDto;
import ru.alex.eventspaceapi.mapper.eventCategory.EventCategoryReadMapper;
import ru.alex.eventspaceapi.mapper.eventStep.EventStepReadMapper;
import ru.alex.eventspaceapi.mapper.space.SpaceReadMapper;
import ru.alex.eventspaceapi.mapper.user.UserAuthorMapper;

import static ru.alex.eventspaceapi.util.AuthUtils.getAuthorizedUser;

@Mapper(
        componentModel = "spring",
        uses = {
                EventCategoryReadMapper.class,
                SpaceReadMapper.class,
                EventStepReadMapper.class,
                UserAuthorMapper.class
        }
)
public interface EventReadMapper {
    @Mapping(target = "participantQuantity", source = "event", qualifiedByName = "mapParticipantsQuantity")
    @Mapping(target = "isRegistered", source = "event", qualifiedByName = "mapIsRegistered")
    EventReadDto toDto(Event event);

    @Named("mapParticipantsQuantity")
    default Integer mapParticipantsQuantity(Event event) {
        return event.getUsers().size();
    }

    @Named("mapIsRegistered")
    default Boolean mapIsRegistered(Event event) {
        UserDetailsDto user = getAuthorizedUser();
        return user != null && event.getUsers().stream().anyMatch(u -> u.getId().equals(user.id()));
    }
}
