package ru.alex.eventspaceapi.mapper.user;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import ru.alex.eventspaceapi.database.entity.User;
import ru.alex.eventspaceapi.dto.user.UserRegisterDto;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface UserRegisterMapper {
    @Mapping(target = "program.id", source = "program")
    User toEntity(UserRegisterDto dto);
}
