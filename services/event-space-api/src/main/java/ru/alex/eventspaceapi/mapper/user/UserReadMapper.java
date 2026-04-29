package ru.alex.eventspaceapi.mapper.user;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import ru.alex.eventspaceapi.database.entity.EventCategory;
import ru.alex.eventspaceapi.database.entity.User;
import ru.alex.eventspaceapi.dto.user.UserReadDto;
import ru.alex.eventspaceapi.mapper.program.ProgramListMapper;

import java.util.List;
import java.util.Set;

@Mapper(componentModel = "spring", uses = ProgramListMapper.class)
public interface UserReadMapper {
    @Mapping(source = "notificationCategories", target = "notificationCategoryIds", qualifiedByName = "categoriesToIds")
    UserReadDto toDto(User entity);

    @Named("categoriesToIds")
    default List<Integer> categoriesToIds(Set<EventCategory> categories) {
        if (categories == null) return List.of();
        return categories.stream().map(EventCategory::getId).toList();
    }
}
