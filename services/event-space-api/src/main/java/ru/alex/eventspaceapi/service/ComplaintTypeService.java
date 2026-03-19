package ru.alex.eventspaceapi.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.alex.eventspaceapi.database.repository.ComplaintTypeRepository;
import ru.alex.eventspaceapi.dto.complaintType.ComplaintTypeReadDto;
import ru.alex.eventspaceapi.mapper.complaintType.ComplaintTypeReadMapper;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ComplaintTypeService {
    private final ComplaintTypeRepository complaintTypeRepository;
    private final ComplaintTypeReadMapper complaintTypeReadMapper;

    public List<ComplaintTypeReadDto> findAll() {
        return complaintTypeRepository.findAll(Sort.by("name"))
                .stream()
                .map(complaintTypeReadMapper::toDto)
                .toList();
    }
}
