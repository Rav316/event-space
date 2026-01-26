package ru.alex.eventspaceapi.database.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import ru.alex.eventspaceapi.database.entity.EventReview;

import java.util.Optional;

@Repository
public interface EventReviewRepository extends JpaRepository<EventReview, Integer>, EventReviewRepositoryCustom {
    @Query("SELECT EXISTS (SELECT 1 FROM EventReview er WHERE er.event.id = :eventId AND er.author.id = :userId)")
    boolean existsByEventAndUser(Integer eventId, Integer userId);

    @Query("SELECT er FROM EventReview er WHERE er.event.id = :eventId AND er.author.id = :userId")
    Optional<EventReview> findByEventAndUser(Integer eventId, Integer userId);

    @Query("""
        SELECT er
        FROM EventReview er
        LEFT JOIN FETCH er.helpfulMarks hm
        WHERE er.event.id = :eventId AND er.author.id = :userId
        """)
    Optional<EventReview> findByEventAndUserWithHelpfulMarks(Integer eventId, Integer userId);

    @Modifying
    @Query("DELETE FROM EventReview eu WHERE eu.event.id = :eventId AND eu.author.id = :userId")
    void deleteByEventAndUser(Integer eventId, Integer userId);
}
