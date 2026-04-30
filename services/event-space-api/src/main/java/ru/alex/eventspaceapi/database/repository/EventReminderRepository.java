package ru.alex.eventspaceapi.database.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import ru.alex.eventspaceapi.database.entity.EventReminder;

import java.time.Instant;
import java.util.List;

@Repository
public interface EventReminderRepository extends JpaRepository<EventReminder, Long> {

    @Query(value = """
            SELECT * FROM event_reminder
            WHERE status = 'PENDING'
              AND send_at <= :now
            ORDER BY send_at
            LIMIT :limit
            FOR UPDATE SKIP LOCKED
            """, nativeQuery = true)
    List<EventReminder> claimDue(@Param("now") Instant now, @Param("limit") int limit);

    @Modifying
    @Query(value = """
            DELETE FROM event_reminder
            WHERE event_id = :eventId
              AND user_id = :userId
              AND status = 'PENDING'
            """, nativeQuery = true)
    int deletePending(@Param("eventId") Integer eventId, @Param("userId") Integer userId);

    @Modifying
    @Query(value = """
            UPDATE event_reminder
            SET send_at = :newAt
            WHERE event_id = :eventId
              AND status = 'PENDING'
            """, nativeQuery = true)
    int rescheduleByEvent(@Param("eventId") Integer eventId, @Param("newAt") Instant newAt);

    @Modifying
    @Query(value = """
            DELETE FROM event_reminder
            WHERE event_id = :eventId
              AND status = 'PENDING'
            """, nativeQuery = true)
    int deleteAllPendingByEvent(@Param("eventId") Integer eventId);

    boolean existsByEventIdAndUserId(Integer eventId, Integer userId);
}
