package ru.alex.eventspaceapi.mapper.eventReview;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import ru.alex.eventspaceapi.database.entity.EventReview;
import ru.alex.eventspaceapi.dto.eventReview.EventReviewReadDto;
import ru.alex.eventspaceapi.dto.user.UserDetailsDto;
import ru.alex.eventspaceapi.mapper.user.UserAuthorMapper;
import ru.alex.eventspaceapi.util.AuthUtils;

@Mapper(
        componentModel = "spring",
        uses = {UserAuthorMapper.class}
)
public interface EventReviewReadMapper {
    @Mapping(target = "event", source = "eventReview", qualifiedByName = "mapEvent")
    @Mapping(target = "helpfulMarks", source = "eventReview", qualifiedByName = "mapHelpfulMarks")
    @Mapping(target = "userMarkedHelpful", source = "eventReview", qualifiedByName = "mapUserMarkedHelpful")
    EventReviewReadDto toDto(EventReview eventReview);

    @Named("mapEvent")
    default Integer mapEvent(EventReview eventReview) {
        return eventReview.getEvent().getId();
    }

    @Named("mapHelpfulMarks")
    default Integer mapHelpfulMarks(EventReview eventReview) {
        return eventReview.getHelpfulMarks() != null ? eventReview.getHelpfulMarks().size() : 0;
    }

    @Named("mapUserMarkedHelpful")
    default Boolean mapUserMarkHelpful(EventReview eventReview) {
        UserDetailsDto authorizedUser = AuthUtils.getAuthorizedUser();
        if(eventReview.getHelpfulMarks() == null || authorizedUser == null) return false;
        return eventReview.getHelpfulMarks()
                .stream()
                .anyMatch(mark -> mark.getUser().getId().equals(authorizedUser.id()));
    }
}
