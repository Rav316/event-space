package ru.alex.eventspaceapi.database.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.alex.eventspaceapi.database.entity.ComplaintType;

@Repository
public interface ComplaintTypeRepository extends JpaRepository<ComplaintType, Integer> {
}
