package ru.alex.eventspaceapi.mapper.eventReview;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import ru.alex.eventspaceapi.database.entity.EventReview;
import ru.alex.eventspaceapi.dto.eventReview.EventReviewMyDto;

@Mapper(componentModel = "spring")
public interface EventReviewMyMapper {
    @Mapping(target = "event", source = "eventReview", qualifiedByName = "mapEvent")
    EventReviewMyDto toDto(EventReview eventReview);

    @Named("mapEvent")
    default Integer mapEvent(EventReview eventReview) {
        return eventReview.getEvent().getId();
    }
}
