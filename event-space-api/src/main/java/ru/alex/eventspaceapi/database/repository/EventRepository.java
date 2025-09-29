package ru.alex.eventspaceapi.database.repository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import ru.alex.eventspaceapi.database.entity.Event;

import java.util.List;

@Repository
public interface EventRepository extends JpaRepository<Event, Integer> {
    @Query("""
        SELECT e FROM Event e
        LEFT JOIN FETCH e.category c
        LEFT JOIN FETCH e.space s
        LEFT JOIN FETCH s.building b
        LEFT JOIN FETCH e.users u
        ORDER BY e.eventDate DESC, e.startTime DESC
        """)
    List<Event> getActualEvents(Pageable pageable);
}
