package ru.alex.eventspaceapi.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.alex.eventspaceapi.database.entity.Building;
import ru.alex.eventspaceapi.database.repository.BuildingRepository;
import ru.alex.eventspaceapi.dto.building.BuildingCreateDto;
import ru.alex.eventspaceapi.dto.building.BuildingDeleteImpactDto;
import ru.alex.eventspaceapi.dto.building.BuildingEditDto;
import ru.alex.eventspaceapi.dto.building.BuildingReadDto;
import ru.alex.eventspaceapi.dto.filter.AdminListFilter;
import ru.alex.eventspaceapi.exception.BuildingNotFoundException;
import ru.alex.eventspaceapi.mapper.building.BuildingCreateMapper;
import ru.alex.eventspaceapi.mapper.building.BuildingEditMapper;
import ru.alex.eventspaceapi.mapper.building.BuildingReadMapper;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class BuildingService {
    private final BuildingRepository buildingRepository;
    private final BuildingReadMapper buildingReadMapper;
    private final BuildingCreateMapper buildingCreateMapper;
    private final BuildingEditMapper buildingEditMapper;

    public List<BuildingReadDto> findAll() {
        return buildingRepository.findAll(Sort.by("name"))
                .stream()
                .map(buildingReadMapper::toDto)
                .toList();
    }

    @Transactional
    public BuildingReadDto create(BuildingCreateDto buildingCreateDto) {
        Building building = buildingCreateMapper.toEntity(buildingCreateDto);

        return buildingReadMapper.toDto(buildingRepository.save(building));
    }

    @Transactional
    public BuildingReadDto update(Integer id, BuildingEditDto dto) {
        Building building = buildingRepository.findById(id)
                .orElseThrow(() -> new BuildingNotFoundException(id));
        buildingEditMapper.updateFromEntity(dto, building);
        return buildingReadMapper.toDto(buildingRepository.save(building));
    }

    public Page<BuildingReadDto> findAllByFilter(AdminListFilter filter, Sort sort) {
        return buildingRepository.findAllByFilter(filter, sort)
                .map(buildingReadMapper::toDto);
    }

    public boolean existsByName(String name) {
        return buildingRepository.existsByName(name);
    }

    public BuildingDeleteImpactDto getDeleteImpact(Integer id) {
        return buildingRepository.getDeleteImpact(id);
    }

    @Transactional
    public void delete(Integer id) {
        buildingRepository.deleteById(id);
    }
}
