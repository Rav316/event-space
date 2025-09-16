package ru.alex.eventspaceapi.mapper.user;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import ru.alex.eventspaceapi.database.entity.User;
import ru.alex.eventspaceapi.dto.user.UserRegisterDto;
import ru.alex.eventspaceapi.model.Role;

@Mapper(componentModel = "spring")
public interface UserRegisterMapper {
    @Mapping(target = "role", source = "role", qualifiedByName = "intToRole")
    @Mapping(target = "faculty.id", source = "faculty")
    User toEntity(UserRegisterDto dto);

    @Named("intToRole")
    default Role intToRole(Integer role) {
        if(role == null) {
            return null;
        }
        return Role.values()[role];
    }
}
