package ru.alex.eventspaceapi.mapper.user;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import ru.alex.eventspaceapi.database.entity.User;
import ru.alex.eventspaceapi.dto.user.UserAdminListDto;
import ru.alex.eventspaceapi.mapper.program.ProgramListMapper;

@Mapper(componentModel = "spring", uses = ProgramListMapper.class)
public interface UserListMapper {
    @Mapping(source = "program.preferredCategories", target = "program.preferredCategoryIds", qualifiedByName = "mapPreferredCategoryIds")
    UserAdminListDto toDto(User user);
}
