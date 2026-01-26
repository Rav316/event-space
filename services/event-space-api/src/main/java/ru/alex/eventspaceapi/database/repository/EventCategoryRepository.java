package ru.alex.eventspaceapi.database.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import ru.alex.eventspaceapi.database.entity.EventCategory;

import java.util.List;

@Repository
public interface EventCategoryRepository extends JpaRepository<EventCategory, Integer>, EventCategoryRepositoryCustom {
    @Query("SELECT ec FROM EventCategory ec LEFT JOIN FETCH ec.events e ORDER BY ec.name")
    List<EventCategory> findAllWithEvents();
}
