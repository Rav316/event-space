package ru.alex.eventspaceapi.mapper.program;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import ru.alex.eventspaceapi.database.entity.EventCategory;
import ru.alex.eventspaceapi.database.entity.Program;
import ru.alex.eventspaceapi.dto.program.ProgramListDto;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ProgramListMapper {
    @Mapping(
            target = "preferredCategoryIds",
            source = "program.preferredCategories",
            qualifiedByName = "mapPreferredCategoryIds"
    )
    ProgramListDto toDto(Program program);

    @Named("mapPreferredCategoryIds")
    default List<Integer> mapPreferredCategoryIds(List<EventCategory> categories) {
        return categories.stream()
                .map(EventCategory::getId)
                .toList();
    }
}
