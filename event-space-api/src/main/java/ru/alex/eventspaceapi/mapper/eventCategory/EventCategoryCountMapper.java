package ru.alex.eventspaceapi.mapper.eventCategory;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import ru.alex.eventspaceapi.database.entity.EventCategory;
import ru.alex.eventspaceapi.dto.eventCategory.EventCategoryCountDto;

@Mapper(componentModel = "spring")
public interface EventCategoryCountMapper {
    @Mapping(target = "eventCount", source = "eventCategory", qualifiedByName = "mapEventCount")
    EventCategoryCountDto toDto(EventCategory eventCategory);

    @Named("mapEventCount")
    default Integer mapEventCount(EventCategory eventCategory) {
        return eventCategory.getEvents().size();
    }
}
