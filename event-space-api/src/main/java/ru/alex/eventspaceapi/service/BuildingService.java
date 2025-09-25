package ru.alex.eventspaceapi.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.alex.eventspaceapi.database.repository.BuildingRepository;
import ru.alex.eventspaceapi.dto.building.BuildingReadDto;
import ru.alex.eventspaceapi.mapper.building.BuildingReadMapper;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class BuildingService {
    private final BuildingRepository buildingRepository;
    private final BuildingReadMapper buildingReadMapper;

    public List<BuildingReadDto> findAll() {
        return buildingRepository.findAll(Sort.by("address"))
                .stream()
                .map(buildingReadMapper::toDto)
                .toList();
    }
}
