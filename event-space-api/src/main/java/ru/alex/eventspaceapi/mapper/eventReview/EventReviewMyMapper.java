package ru.alex.eventspaceapi.mapper.eventReview;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import ru.alex.eventspaceapi.database.entity.EventReview;
import ru.alex.eventspaceapi.database.entity.HelpfulMark;
import ru.alex.eventspaceapi.dto.eventReview.EventReviewMyDto;
import ru.alex.eventspaceapi.util.AuthUtils;

import java.util.List;
import java.util.Objects;

@Mapper(componentModel = "spring")
public interface EventReviewMyMapper {
    @Mapping(target = "event", source = "eventReview", qualifiedByName = "mapEvent")
    @Mapping(target = "helpfulMarks", source = "eventReview.helpfulMarks", qualifiedByName = "mapHelpfulMarks")
    @Mapping(target = "userMarkedHelpful", source = "eventReview.helpfulMarks", qualifiedByName = "mapUserMarkedHelpful")
    EventReviewMyDto toDto(EventReview eventReview);

    @Named("mapEvent")
    default Integer mapEvent(EventReview eventReview) {
        return eventReview.getEvent().getId();
    }

    @Named("mapHelpfulMarks")
    default Integer mapHelpfulMarks(List<HelpfulMark> helpfulMarks) {
        return helpfulMarks.size();
    }

    @Named("mapUserMarkedHelpful")
    default Boolean mapUserMarkedHelpful(List<HelpfulMark> helpfulMarks) {
        Integer authorizedUserId = Objects.requireNonNull(AuthUtils.getAuthorizedUser()).id();
        return helpfulMarks.stream().anyMatch(mark -> mark.getUser().getId().equals(authorizedUserId));
    }
}
