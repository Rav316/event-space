package ru.alex.eventspaceapi.database.repository;

import ru.alex.eventspaceapi.dto.filter.SpaceFilter;
import ru.alex.eventspaceapi.dto.space.SpaceListDto;

import java.util.List;

public interface SpaceRepositoryCustom {
    List<SpaceListDto> findAllByFilter(SpaceFilter filter);
}
