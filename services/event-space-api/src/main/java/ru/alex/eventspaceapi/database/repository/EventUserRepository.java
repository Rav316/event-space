package ru.alex.eventspaceapi.database.repository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import ru.alex.eventspaceapi.database.entity.EventUser;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface EventUserRepository extends JpaRepository<EventUser, Integer>, EventUserRepositoryCustom {
    @Query("SELECT eu FROM EventUser eu WHERE eu.event.id = :eventId")
    List<EventUser> findAllByEvent(Integer eventId);

    @Query("""
        SELECT eu
        FROM EventUser eu
        LEFT JOIN FETCH eu.event e
        LEFT JOIN FETCH e.category c
        LEFT JOIN FETCH e.space s
        LEFT JOIN FETCH s.building b
        WHERE (e.eventDate, e.startTime) > (CURRENT_DATE, CURRENT_TIME)
                AND eu.user.id = :userId
        ORDER BY e.eventDate DESC, e.startTime DESC
        """)
    Slice<EventUser> findAllUpcomingByUserWithLoadedEntities(Integer userId, Pageable pageable);

    @Query("""
        SELECT eu
        FROM EventUser eu
        LEFT JOIN FETCH eu.event e
        LEFT JOIN FETCH e.category c
        LEFT JOIN FETCH e.space s
        LEFT JOIN FETCH s.building b
        WHERE (e.eventDate, e.startTime) < (CURRENT_DATE, CURRENT_TIME)
                AND eu.user.id = :userId
        ORDER BY e.eventDate DESC, e.startTime DESC
        """)
    Slice<EventUser> findAllFinishedByUserWithLoadedEntities(Integer userId, Pageable pageable);

    @Query("SELECT eu FROM EventUser eu WHERE eu.event.id = :eventId AND eu.user.id = :userId")
    Optional<EventUser> findByEventAndUser(Integer eventId, Integer userId);

    @Query("SELECT eu FROM EventUser eu LEFT JOIN FETCH eu.event e WHERE eu.qrToken = :qrToken")
    Optional<EventUser> findByQrTokenWithEvent(UUID qrToken);
}
