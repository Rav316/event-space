package ru.alex.eventspaceapi.mapper.eventReview;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import ru.alex.eventspaceapi.database.entity.EventReview;
import ru.alex.eventspaceapi.dto.eventReview.EventReviewReadDto;
import ru.alex.eventspaceapi.mapper.user.UserAuthorMapper;

@Mapper(
        componentModel = "spring",
        uses = {UserAuthorMapper.class}
)
public interface EventReviewReadMapper {
    @Mapping(target = "event", source = "eventReview", qualifiedByName = "mapEvent")
    EventReviewReadDto toDto(EventReview eventReview);

    @Named("mapEvent")
    default Integer mapEvent(EventReview eventReview) {
        return eventReview.getEvent().getId();
    }
}
