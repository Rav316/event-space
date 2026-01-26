package ru.alex.eventspaceapi.database.repository;

import jakarta.persistence.LockModeType;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
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
        LEFT JOIN FETCH e.eventUsers eu
        LEFT JOIN FETCH e.author a
        WHERE (e.eventDate, e.startTime) > (CURRENT_DATE, CURRENT_TIME)
        ORDER BY e.eventDate ASC , e.startTime DESC, e.id DESC
        """)
    List<Event> getActualEvents(Pageable pageable);

    @Query("""
        SELECT e FROM Event e
        LEFT JOIN FETCH e.category c
        LEFT JOIN FETCH e.space s
        LEFT JOIN FETCH s.building b
        LEFT JOIN FETCH e.eventUsers eu
        LEFT JOIN FETCH e.author a
        WHERE e.id = :id
        """)
    Optional<Event> findByIdWithLoadedEntities(Integer id);

    @Query("""
        SELECT e FROM Event e
        LEFT JOIN FETCH e.space s
        LEFT JOIN FETCH s.building b
        LEFT JOIN FETCH e.eventUsers eu
        WHERE e.id = :id
        """)
    Optional<Event> findByIdWithDetails(Integer id);

    @Query("""
        SELECT e
        FROM Event e
        WHERE e.id = :id
        """)
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    Optional<Event> findByIdForUpdate(Integer id);

    @Query(value = """
        SELECT DISTINCT t
        FROM event, unnest(tags) AS t
        WHERE t ILIKE concat(:prefix, '%')
        """, nativeQuery = true)
    List<String> findTagsStartWith(String prefix);
}
