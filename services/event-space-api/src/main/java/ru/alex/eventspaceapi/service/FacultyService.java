package ru.alex.eventspaceapi.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.alex.eventspaceapi.database.entity.Building;
import ru.alex.eventspaceapi.database.entity.Faculty;
import ru.alex.eventspaceapi.database.repository.BuildingRepository;
import ru.alex.eventspaceapi.database.repository.FacultyRepository;
import ru.alex.eventspaceapi.dto.faculty.FacultyCreateDto;
import ru.alex.eventspaceapi.dto.faculty.FacultyDeleteImpactDto;
import ru.alex.eventspaceapi.dto.faculty.FacultyEditDto;
import ru.alex.eventspaceapi.dto.faculty.FacultyListDto;
import ru.alex.eventspaceapi.dto.faculty.FacultyReadDto;
import ru.alex.eventspaceapi.dto.filter.AdminListFilter;
import ru.alex.eventspaceapi.exception.BuildingNotFoundException;
import ru.alex.eventspaceapi.exception.FacultyNotFoundException;
import ru.alex.eventspaceapi.mapper.faculty.FacultyCreateMapper;
import ru.alex.eventspaceapi.mapper.faculty.FacultyEditMapper;
import ru.alex.eventspaceapi.mapper.faculty.FacultyListMapper;
import ru.alex.eventspaceapi.mapper.faculty.FacultyReadMapper;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class FacultyService {
    private final FacultyRepository facultyRepository;
    private final BuildingRepository buildingRepository;
    private final FacultyListMapper facultyListMapper;
    private final FacultyReadMapper facultyReadMapper;
    private final FacultyCreateMapper facultyCreateMapper;
    private final FacultyEditMapper facultyEditMapper;

    public List<FacultyListDto> findAll() {
        return facultyRepository.findAll(Sort.by("name"))
                .stream()
                .map(facultyListMapper::toDto)
                .toList();
    }

    public Page<FacultyReadDto> findAllByFilter(AdminListFilter filter, Sort sort) {
        return facultyRepository.findAllByFilter(filter, sort)
                .map(facultyReadMapper::toDto);
    }

    public boolean existsByName(String name) {
        return facultyRepository.existsByName(name);
    }

    @Transactional
    public FacultyReadDto create(FacultyCreateDto dto) {
        Faculty faculty = facultyCreateMapper.toEntity(dto);
        Building building = buildingRepository.findById(dto.building())
                .orElseThrow(() -> new BuildingNotFoundException(dto.building()));
        faculty.setBuilding(building);

        return facultyReadMapper.toDto(facultyRepository.save(faculty));
    }

    @Transactional
    public FacultyReadDto update(Integer id, FacultyEditDto dto) {
        Faculty faculty = facultyRepository.findById(id)
                .orElseThrow(() -> new FacultyNotFoundException(id));
        facultyEditMapper.updateFromDto(dto, faculty);
        if(dto.building() != null) {
            if (faculty.getBuilding() == null || !faculty.getBuilding().getId().equals(dto.building())) {
                Building building = buildingRepository.findById(dto.building())
                        .orElseThrow(() -> new BuildingNotFoundException(dto.building()));
                faculty.setBuilding(building);
            }
        }

        return facultyReadMapper.toDto(facultyRepository.save(faculty));
    }

    public FacultyDeleteImpactDto getDeleteImpact(Integer id) {
        return facultyRepository.getDeleteImpact(id);
    }

    @Transactional
    public void delete(Integer id) {
        facultyRepository.deleteById(id);
    }
}
