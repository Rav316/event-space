package ru.alex.eventspaceapi.database.repository;

import ru.alex.eventspaceapi.database.entity.EventStep;

import java.util.List;

public interface EventStepRepositoryCustom {
    void insertEventStepsBatch(List<EventStep> steps);
}
