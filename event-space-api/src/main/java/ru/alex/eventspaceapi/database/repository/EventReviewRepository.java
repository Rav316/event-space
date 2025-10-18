package ru.alex.eventspaceapi.database.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import ru.alex.eventspaceapi.database.entity.EventReview;

@Repository
public interface EventReviewRepository extends JpaRepository<EventReview, Integer> {
    @Query("SELECT EXISTS (SELECT 1 FROM EventUser eu WHERE eu.event.id = :eventId AND eu.user.id = :userId)")
    boolean existsByEventAndUser(Integer eventId, Integer userId);
}
