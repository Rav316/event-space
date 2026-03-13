package ru.alex.eventspaceapi.database.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import ru.alex.eventspaceapi.database.entity.Space;

public interface SpaceRepository extends JpaRepository<Space, Integer>, SpaceRepositoryCustom {
    @Query("SELECT EXISTS (SELECT 1 FROM Space s WHERE s.name = :name AND s.building.id = :building)")
    boolean existsByNameAndBuilding(String name, Integer building);
}
