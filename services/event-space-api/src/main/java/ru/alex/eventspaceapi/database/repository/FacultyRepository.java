package ru.alex.eventspaceapi.database.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.alex.eventspaceapi.database.entity.Faculty;

@Repository
public interface FacultyRepository extends JpaRepository<Faculty, Integer>, FacultyRepositoryCustom {
    boolean existsByName(String name);
}
