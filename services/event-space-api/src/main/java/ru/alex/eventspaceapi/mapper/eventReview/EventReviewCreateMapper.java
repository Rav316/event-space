package ru.alex.eventspaceapi.mapper.eventReview;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import ru.alex.eventspaceapi.database.entity.EventReview;
import ru.alex.eventspaceapi.dto.eventReview.EventReviewCreateEditDto;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface EventReviewCreateMapper {
    EventReview toEntity(EventReviewCreateEditDto dto);
}
