package ru.alex.eventspaceapi.mapper.eventReview;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import ru.alex.eventspaceapi.database.entity.EventReview;
import ru.alex.eventspaceapi.dto.eventReview.EventReviewCreateDto;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface EventReviewCreateMapper {
    EventReview toEntity(EventReviewCreateDto dto);
}
