package ru.alex.eventspaceapi.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.alex.eventspaceapi.database.repository.FacultyRepository;
import ru.alex.eventspaceapi.dto.faculty.FacultyListDto;
import ru.alex.eventspaceapi.mapper.faculty.FacultyListMapper;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class FacultyService {
    private final FacultyRepository facultyRepository;
    private final FacultyListMapper facultyListMapper;

    public List<FacultyListDto> findAll() {
        return facultyRepository.findAll(Sort.by("name"))
                .stream()
                .map(facultyListMapper::toDto)
                .toList();
    }

}
