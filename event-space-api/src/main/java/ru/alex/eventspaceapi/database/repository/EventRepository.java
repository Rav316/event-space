package ru.alex.eventspaceapi.database.repository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import ru.alex.eventspaceapi.database.entity.Event;

import java.util.List;
import java.util.Optional;

@Repository
public interface EventRepository extends JpaRepository<Event, Integer>, EventRepositoryCustom {
    @Query("""
        SELECT e FROM Event e
        LEFT JOIN FETCH e.category c
        LEFT JOIN FETCH e.space s
        LEFT JOIN FETCH s.building b
        LEFT JOIN FETCH e.users u
        WHERE (e.eventDate, e.startTime) > (CURRENT_DATE, CURRENT_TIME)
        ORDER BY e.eventDate ASC , e.startTime DESC
        """)
    List<Event> getActualEvents(Pageable pageable);

    @Query("""
        SELECT e FROM Event e
        LEFT JOIN FETCH e.category c
        LEFT JOIN FETCH e.space s
        LEFT JOIN FETCH s.building b
        LEFT JOIN FETCH e.users u
        LEFT JOIN FETCH e.steps es
        WHERE e.id = :id
        """)
    Optional<Event> findByIdWithLoadedEntities(Integer id);

    @Query("""
        SELECT e
        FROM Event e
        LEFT JOIN FETCH e.users
        WHERE e.id = :id
        """)
    Optional<Event> findByIdWithUser(Integer id);

    @Query(value = """
        SELECT DISTINCT t
        FROM event, unnest(tags) AS t
        WHERE t ILIKE concat(:prefix, '%')
        """, nativeQuery = true)
    List<String> findTagsStartWith(String prefix);
}
