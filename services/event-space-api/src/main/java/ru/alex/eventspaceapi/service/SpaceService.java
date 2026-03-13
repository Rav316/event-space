package ru.alex.eventspaceapi.service;

import io.github.rav316.nullablevalue.NullableValue;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.alex.eventspaceapi.database.entity.Building;
import ru.alex.eventspaceapi.database.entity.Space;
import ru.alex.eventspaceapi.database.entity.SpaceType;
import ru.alex.eventspaceapi.database.repository.BuildingRepository;
import ru.alex.eventspaceapi.database.repository.SpaceRepository;
import ru.alex.eventspaceapi.database.repository.SpaceTypeRepository;
import ru.alex.eventspaceapi.dto.filter.AdminListFilter;
import ru.alex.eventspaceapi.dto.filter.SpaceFilter;
import ru.alex.eventspaceapi.dto.space.SpaceCreateDto;
import ru.alex.eventspaceapi.dto.space.SpaceDeleteImpactDto;
import ru.alex.eventspaceapi.dto.space.SpaceEditDto;
import ru.alex.eventspaceapi.dto.space.SpaceListDto;
import ru.alex.eventspaceapi.exception.BuildingNotFoundException;
import ru.alex.eventspaceapi.exception.SpaceNotFoundException;
import ru.alex.eventspaceapi.exception.SpaceTypeNotFoundException;
import ru.alex.eventspaceapi.mapper.space.SpaceCreateMapper;
import ru.alex.eventspaceapi.mapper.space.SpaceEditMapper;
import ru.alex.eventspaceapi.mapper.space.SpaceListMapper;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class SpaceService {
    private final SpaceRepository spaceRepository;
    private final BuildingRepository buildingRepository;
    private final SpaceTypeRepository spaceTypeRepository;
    private final SpaceListMapper spaceListMapper;
    private final SpaceCreateMapper spaceCreateMapper;
    private final SpaceEditMapper spaceEditMapper;

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

    public boolean existsByNameAndBuilding(String name, Integer building) {
        return spaceRepository.existsByNameAndBuilding(name, building);
    }

    @Transactional
    public SpaceListDto create(SpaceCreateDto dto) {
        Space space = spaceCreateMapper.toEntity(dto);
        Building building = buildingRepository.findById(dto.building())
                .orElseThrow(() -> new BuildingNotFoundException(dto.building()));
        SpaceType spaceType = spaceTypeRepository.findById(dto.type())
                .orElseThrow(() -> new SpaceTypeNotFoundException(dto.type()));
        space.setBuilding(building);
        space.setType(spaceType);

        return spaceListMapper.toDto(spaceRepository.save(space));
    }

    @Transactional
    public SpaceListDto update(Integer id, SpaceEditDto dto) {
        Space space = spaceRepository.findById(id)
                .orElseThrow(() -> new SpaceNotFoundException(id));
        spaceEditMapper.updateFromDto(dto, space);

        if(!dto.getBuilding().equals(NullableValue.undefined())) {
            if(space.getBuilding() == null || !space.getBuilding().getId().equals(dto.getBuilding().get())) {
                Building building = buildingRepository.findById(dto.getBuilding().get())
                        .orElseThrow(() -> new SpaceTypeNotFoundException(dto.getBuilding().get()));
                space.setBuilding(building);
            }
        }
        if(!dto.getType().equals(NullableValue.undefined())) {
            if(space.getType() == null || !space.getType().getId().equals(dto.getType().get())) {
                SpaceType spaceType = spaceTypeRepository.findById(dto.getType().get())
                        .orElseThrow(() -> new SpaceTypeNotFoundException(dto.getType().get()));
                space.setType(spaceType);
            }
        }
        return spaceListMapper.toDto(spaceRepository.save(space));
    }

    public SpaceDeleteImpactDto getDeleteImpact(Integer id) {
        return spaceRepository.getDeleteImpact(id);
    }

    @Transactional
    public void delete(Integer id) {
        spaceRepository.deleteById(id);
    }
}
