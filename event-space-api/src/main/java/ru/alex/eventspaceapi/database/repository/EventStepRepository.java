package ru.alex.eventspaceapi.database.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import ru.alex.eventspaceapi.database.entity.EventStep;

import java.util.List;

@Repository
public interface EventStepRepository extends JpaRepository<EventStep, Integer>, EventStepRepositoryCustom {
    @Query("SELECT es FROM EventStep es WHERE es.event.id = :eventId")
    List<EventStep> findAllByEvent(Integer eventId);
}
