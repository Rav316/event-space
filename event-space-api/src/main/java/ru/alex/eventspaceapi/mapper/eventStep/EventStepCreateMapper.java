package ru.alex.eventspaceapi.mapper.eventStep;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import ru.alex.eventspaceapi.database.entity.Event;
import ru.alex.eventspaceapi.database.entity.EventStep;
import ru.alex.eventspaceapi.dto.eventStep.EventStepCreateDto;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface EventStepCreateMapper {

    EventStep toEntity(EventStepCreateDto dto);

    default Event map(Integer eventId) {
        if (eventId == null) {
            return null;
        }
        Event e = new Event();
        e.setId(eventId);
        return e;
    }
}
