package ru.alex.eventspaceapi.database.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import ru.alex.eventspaceapi.database.entity.EventUser;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface EventUserRepository extends JpaRepository<EventUser, Integer> {
    @Query("SELECT eu FROM EventUser eu WHERE eu.event.id = :eventId")
    List<EventUser> findAllByEvent(Integer eventId);

    @Query("SELECT eu FROM EventUser eu WHERE eu.event.id = :eventId AND eu.user.id = :userId")
    Optional<EventUser> findByEventAndUser(Integer eventId, Integer userId);

    Optional<EventUser> findByQrToken(UUID qrToken);
}
