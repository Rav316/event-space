package ru.alex.eventspaceapi.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.alex.eventspaceapi.database.repository.SpaceRepository;
import ru.alex.eventspaceapi.dto.filter.SpaceFilter;
import ru.alex.eventspaceapi.dto.space.SpaceListDto;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class SpaceService {
    private final SpaceRepository spaceRepository;

    public List<SpaceListDto> findAllByFilter(SpaceFilter filter) {
        return spaceRepository.findAllByFilter(filter);
    }
}
