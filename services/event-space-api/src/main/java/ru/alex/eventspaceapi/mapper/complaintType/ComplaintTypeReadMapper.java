package ru.alex.eventspaceapi.mapper.complaintType;

import org.mapstruct.Mapper;
import ru.alex.eventspaceapi.database.entity.ComplaintType;
import ru.alex.eventspaceapi.dto.complaintType.ComplaintTypeReadDto;

@Mapper(componentModel = "spring")
public interface ComplaintTypeReadMapper {
    ComplaintTypeReadDto toDto(ComplaintType complaintType);
}
