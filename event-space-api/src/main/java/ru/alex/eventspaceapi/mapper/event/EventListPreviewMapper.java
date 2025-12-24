package ru.alex.eventspaceapi.mapper.event;

import org.mapstruct.Mapper;
import ru.alex.eventspaceapi.database.entity.Event;
import ru.alex.eventspaceapi.dto.event.EventListPreviewDto;
import ru.alex.eventspaceapi.mapper.eventCategory.EventCategoryReadMapper;
import ru.alex.eventspaceapi.mapper.space.SpaceReadMapper;

@Mapper(
        componentModel = "spring",
        uses = {
                EventCategoryReadMapper.class,
                SpaceReadMapper.class
        }
)
public interface EventListPreviewMapper {
    EventListPreviewDto toDto(Event event);
}
