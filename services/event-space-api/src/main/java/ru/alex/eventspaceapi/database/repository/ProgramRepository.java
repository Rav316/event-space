package ru.alex.eventspaceapi.database.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.alex.eventspaceapi.database.entity.Program;

@Repository
public interface ProgramRepository extends JpaRepository<Program, Integer>, ProgramRepositoryCustom {
    boolean existsByName(String name);
}
