package ru.alex.eventspaceapi.database.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.alex.eventspaceapi.database.entity.Space;

public interface SpaceRepository extends JpaRepository<Space, Integer>, SpaceRepositoryCustom {
}
