package ru.alex.eventspaceapi.mapper.complaint;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.ReportingPolicy;
import ru.alex.eventspaceapi.database.entity.Complaint;
import ru.alex.eventspaceapi.dto.complaint.ComplaintListDto;
import ru.alex.eventspaceapi.model.ComplaintStatus;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ComplaintListMapper {
    @Mapping(target = "authorFirstName", source = "author.firstName")
    @Mapping(target = "authorLastName", source = "author.lastName")
    @Mapping(target = "authorId", source = "author.id")
    @Mapping(target = "complaintTypeName", source = "complaintType.name")
    @Mapping(target = "status", source = "status", qualifiedByName = "statusToIndex")
    ComplaintListDto toDto(Complaint complaint);

    @Named("statusToIndex")
    default Integer statusToIndex(ComplaintStatus status) {
        return status.ordinal();
    }
}
