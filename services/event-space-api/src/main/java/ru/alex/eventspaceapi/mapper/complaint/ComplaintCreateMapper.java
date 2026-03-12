package ru.alex.eventspaceapi.mapper.complaint;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import ru.alex.eventspaceapi.database.entity.Complaint;
import ru.alex.eventspaceapi.dto.complaint.ComplaintCreateDto;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ComplaintCreateMapper {
    @Mapping(target = "complaintType", ignore = true)
    Complaint toEntity(ComplaintCreateDto dto);
}
