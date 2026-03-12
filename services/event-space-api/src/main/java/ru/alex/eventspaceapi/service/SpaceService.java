package ru.alex.eventspaceapi.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.alex.eventspaceapi.database.repository.SpaceRepository;
import ru.alex.eventspaceapi.dto.filter.AdminListFilter;
import ru.alex.eventspaceapi.dto.filter.SpaceFilter;
import ru.alex.eventspaceapi.dto.space.SpaceListDto;
import ru.alex.eventspaceapi.mapper.space.SpaceListMapper;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class SpaceService {
    private final SpaceRepository spaceRepository;
    private final SpaceListMapper spaceListMapper;

    public List<SpaceListDto> findAllByFilter(SpaceFilter filter) {
        return spaceRepository.findAllByFilter(filter)
                .stream()
                .map(spaceListMapper::toDto)
                .toList();
    }

    public Page<SpaceListDto> findAllByFilter(AdminListFilter filter, Sort sort) {
        return spaceRepository.findAllByFilter(filter, sort)
                .map(spaceListMapper::toDto);
    }
}
