package ru.alex.eventspaceapi.database.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import ru.alex.eventspaceapi.database.entity.EventReview;

@Repository
public interface EventReviewRepository extends JpaRepository<EventReview, Integer>, EventReviewRepositoryCustom {
    @Query("SELECT EXISTS (SELECT 1 FROM EventUser er WHERE er.event.id = :eventId AND er.user.id = :userId)")
    boolean existsByEventAndUser(Integer eventId, Integer userId);
}
