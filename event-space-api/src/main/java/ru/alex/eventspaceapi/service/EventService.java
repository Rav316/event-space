package ru.alex.eventspaceapi.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import ru.alex.eventspaceapi.database.entity.Event;
import ru.alex.eventspaceapi.database.entity.EventStep;
import ru.alex.eventspaceapi.database.entity.EventType;
import ru.alex.eventspaceapi.database.entity.Space;
import ru.alex.eventspaceapi.database.repository.EventRepository;
import ru.alex.eventspaceapi.database.repository.EventStepRepository;
import ru.alex.eventspaceapi.database.repository.EventTypeRepository;
import ru.alex.eventspaceapi.database.repository.SpaceRepository;
import ru.alex.eventspaceapi.dto.event.EventCreateDto;
import ru.alex.eventspaceapi.dto.eventStep.EventStepCreateDto;
import ru.alex.eventspaceapi.exception.EventTypeNotFoundException;
import ru.alex.eventspaceapi.exception.SpaceNotFoundException;
import ru.alex.eventspaceapi.mapper.eventStep.EventStepCreateMapper;

import java.time.LocalDate;
import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class EventService {
    private final FileService fileService;
    private final EventRepository eventRepository;
    private final EventStepRepository eventStepRepository;
    private final SpaceRepository spaceRepository;
    private final EventTypeRepository eventTypeRepository;
    private final EventStepCreateMapper eventStepCreateMapper;

    @Transactional
    public void create(EventCreateDto eventCreateDto, MultipartFile eventImage) {
        Event event = new Event();
        event.setName(eventCreateDto.name());
        String[] tags = eventCreateDto.tags() == null ? new String[]{} :
                eventCreateDto.tags()
                .stream()
                .distinct()
                .toArray(String[]::new);
        event.setTags(tags);
        if(eventCreateDto.eventDate().isBefore(LocalDate.now())) {
            throw new IllegalArgumentException("the event date cannot be earlier than the current one");
        }
        event.setEventDate(eventCreateDto.eventDate());
        if(eventCreateDto.endTime().isBefore(eventCreateDto.startTime())) {
            throw new IllegalArgumentException("the end time of an event cannot be earlier than the start time of the event");
        }
        event.setStartTime(eventCreateDto.startTime());
        event.setEndTime(eventCreateDto.endTime());
        Space space = spaceRepository.findById(eventCreateDto.space())
                .orElseThrow(() -> new SpaceNotFoundException(eventCreateDto.space()));
        event.setSpace(space);
        event.setShortDescription(event.getShortDescription());
        event.setDescription(eventCreateDto.description());

        EventType eventType = eventTypeRepository.findById(eventCreateDto.eventType())
                .orElseThrow(() -> new EventTypeNotFoundException(eventCreateDto.eventType()));
        event.setType(eventType);

        validateEventSteps(eventCreateDto);

        String imageUrl = fileService.saveFile(eventImage);
        event.setImageUrl(imageUrl);

        Event savedEvent = eventRepository.save(event);

        List<EventStep> eventSteps = eventCreateDto.steps().stream()
                .map(eventStepCreateMapper::toEntity)
                .toList();

        eventSteps.forEach(step -> step.setEvent(savedEvent));

        eventStepRepository.insertEventStepsBatch(eventSteps);

    }

    private void validateEventSteps(EventCreateDto event) {
        List<EventStepCreateDto> steps = event.steps();

        for (int i = 0; i < steps.size(); i++) {
            EventStepCreateDto step = steps.get(i);

            // 1) End time must be after start time
            if (!step.startTime().isBefore(step.endTime())) {
                throw new IllegalArgumentException(
                        String.format("Step %d: startTime (%s) must be before endTime (%s)",
                                i + 1, step.startTime(), step.endTime())
                );
            }

            // 2) Steps must be sequential
            if (i > 0) {
                EventStepCreateDto prevStep = steps.get(i - 1);
                if (!prevStep.endTime().equals(step.startTime())) {
                    throw new IllegalArgumentException(
                            String.format("Step %d: must start exactly after the previous step ends (%s)",
                                    i + 1, prevStep.endTime())
                    );
                }
            }

            // 3) Steps must fit within event time
            if (step.startTime().isBefore(event.startTime()) || step.endTime().isAfter(event.endTime())) {
                throw new IllegalArgumentException(
                        String.format("Step %d: step is outside the event time boundaries (%s - %s)",
                                i + 1, event.startTime(), event.endTime())
                );
            }
        }
    }
}
