package ru.alex.eventspaceapi.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.alex.eventspaceapi.database.entity.EventCategory;
import ru.alex.eventspaceapi.database.entity.Program;
import ru.alex.eventspaceapi.database.repository.EventCategoryRepository;
import ru.alex.eventspaceapi.database.repository.ProgramRepository;
import ru.alex.eventspaceapi.dto.program.ProgramCreateDto;
import ru.alex.eventspaceapi.dto.program.ProgramDeleteImpactDto;
import ru.alex.eventspaceapi.dto.program.ProgramEditDto;
import ru.alex.eventspaceapi.dto.program.ProgramListDto;
import ru.alex.eventspaceapi.dto.program.ProgramReadDto;
import ru.alex.eventspaceapi.dto.filter.AdminListFilter;
import ru.alex.eventspaceapi.exception.ProgramNotFoundException;
import ru.alex.eventspaceapi.mapper.program.ProgramCreateMapper;
import ru.alex.eventspaceapi.mapper.program.ProgramEditMapper;
import ru.alex.eventspaceapi.mapper.program.ProgramListMapper;
import ru.alex.eventspaceapi.mapper.program.ProgramReadMapper;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ProgramService {
    private final ProgramRepository programRepository;
    private final EventCategoryRepository eventCategoryRepository;
    private final ProgramListMapper programListMapper;
    private final ProgramReadMapper programReadMapper;
    private final ProgramCreateMapper programCreateMapper;
    private final ProgramEditMapper programEditMapper;

    public List<ProgramListDto> findAll() {
        return programRepository.findAll(Sort.by("name"))
                .stream()
                .map(programListMapper::toDto)
                .toList();
    }

    public Page<ProgramReadDto> findAllByFilter(AdminListFilter filter, Sort sort) {
        return programRepository.findAllByFilter(filter, sort)
                .map(programReadMapper::toDto);
    }

    public boolean existsByName(String name) {
        return programRepository.existsByName(name);
    }

    @Transactional
    public ProgramReadDto create(ProgramCreateDto dto) {
        Program program = programCreateMapper.toEntity(dto);

        List<EventCategory> categories = eventCategoryRepository
                .findAllById(dto.preferredCategoryIds() != null ? dto.preferredCategoryIds() : List.of());
        program.setPreferredCategories(categories);

        return programReadMapper.toDto(programRepository.save(program));
    }

    @Transactional
    public ProgramReadDto update(Integer id, ProgramEditDto dto) {
        Program program = programRepository.findById(id)
                .orElseThrow(() -> new ProgramNotFoundException(id));
        programEditMapper.updateFromDto(dto, program);

        if (dto.preferredCategoryIds() != null) {
            List<EventCategory> categories = eventCategoryRepository.findAllById(dto.preferredCategoryIds());
            program.setPreferredCategories(categories);
        }

        return programReadMapper.toDto(programRepository.save(program));
    }

    public ProgramDeleteImpactDto getDeleteImpact(Integer id) {
        return programRepository.getDeleteImpact(id);
    }

    @Transactional
    public void delete(Integer id) {
        programRepository.deleteById(id);
    }
}
