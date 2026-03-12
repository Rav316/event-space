package ru.alex.eventspaceapi.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.alex.eventspaceapi.database.repository.FacultyRepository;
import ru.alex.eventspaceapi.dto.faculty.FacultyListDto;
import ru.alex.eventspaceapi.dto.faculty.FacultyReadDto;
import ru.alex.eventspaceapi.dto.filter.AdminListFilter;
import ru.alex.eventspaceapi.mapper.faculty.FacultyListMapper;
import ru.alex.eventspaceapi.mapper.faculty.FacultyReadMapper;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class FacultyService {
    private final FacultyRepository facultyRepository;
    private final FacultyListMapper facultyListMapper;
    private final FacultyReadMapper facultyReadMapper;

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
}
