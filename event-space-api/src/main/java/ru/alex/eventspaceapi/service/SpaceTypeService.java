package ru.alex.eventspaceapi.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.alex.eventspaceapi.database.repository.SpaceTypeRepository;
import ru.alex.eventspaceapi.dto.spaceType.SpaceTypeReadDto;
import ru.alex.eventspaceapi.mapper.spaceType.SpaceTypeReadMapper;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class SpaceTypeService {
    private final SpaceTypeRepository spaceTypeRepository;
    private final SpaceTypeReadMapper spaceTypeReadMapper;

    public List<SpaceTypeReadDto> findAll() {
        return spaceTypeRepository.findAll(Sort.by("name"))
                .stream()
                .map(spaceTypeReadMapper::toDto)
                .toList();
    }
}
