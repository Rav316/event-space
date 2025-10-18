package ru.alex.eventspaceapi.mapper.event;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import ru.alex.eventspaceapi.database.entity.Event;
import ru.alex.eventspaceapi.database.entity.EventUser;
import ru.alex.eventspaceapi.dto.event.EventReadDto;
import ru.alex.eventspaceapi.dto.user.UserDetailsDto;
import ru.alex.eventspaceapi.mapper.eventCategory.EventCategoryReadMapper;
import ru.alex.eventspaceapi.mapper.eventStep.EventStepReadMapper;
import ru.alex.eventspaceapi.mapper.space.SpaceReadMapper;
import ru.alex.eventspaceapi.mapper.user.UserAuthorMapper;

import java.time.LocalDate;
import java.time.LocalTime;

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
    @Mapping(target = "canRegister", source = "event", qualifiedByName = "mapCanRegister")
    @Mapping(target = "canUnregister", source = "event", qualifiedByName = "mapCanUnregister")
    @Mapping(target = "isAttended", source = "event", qualifiedByName = "mapIsAttended")
    @Mapping(target = "qrToken", source = "event", qualifiedByName = "mapQrToken")
    EventReadDto toDto(Event event);

    @Named("mapParticipantsQuantity")
    default Integer mapParticipantsQuantity(Event event) {
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

        if (!eventNotEnded) return false;

        return event.getEventUsers().stream()
                .filter(eu -> eu.getUser().getId().equals(user.id()))
                .findFirst()
                .map(eu -> !eu.getAttended())
                .orElse(false);
    }

    @Named("mapQrToken")
    default String mapQrToken(Event event) {
        UserDetailsDto user = getAuthorizedUser();
        if (user == null) return null;
        return event.getEventUsers().stream()
                .filter(eu -> eu.getUser().getId().equals(user.id()))
                .findFirst()
                .map(eu -> eu.getQrToken().toString())
                .orElse(null);
    }
}
