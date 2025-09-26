package ru.alex.eventspaceapi.database.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.alex.eventspaceapi.database.entity.Event;

@Repository
public interface EventRepository extends JpaRepository<Event, Integer> {
}
