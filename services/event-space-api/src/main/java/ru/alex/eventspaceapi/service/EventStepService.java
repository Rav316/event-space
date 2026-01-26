package ru.alex.eventspaceapi.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.alex.eventspaceapi.database.repository.EventStepRepository;
import ru.alex.eventspaceapi.dto.eventStep.EventStepReadDto;
import ru.alex.eventspaceapi.mapper.eventStep.EventStepReadMapper;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class EventStepService {
    private final EventStepRepository eventStepRepository;
    private final EventStepReadMapper eventStepReadMapper;

    public List<EventStepReadDto> findAllStepsByEvent(Integer eventId) {
        return eventStepRepository.findAllByEvent(eventId)
                .stream()
                .map(eventStepReadMapper::toDto)
                .toList();
    }
}
