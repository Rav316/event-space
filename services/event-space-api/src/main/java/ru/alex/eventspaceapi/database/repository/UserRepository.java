package ru.alex.eventspaceapi.database.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import ru.alex.eventspaceapi.database.entity.User;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer>, UserRepositoryCustom {

    @Query("SELECT u FROM User u LEFT JOIN FETCH u.faculty f WHERE u.id = :id")
    Optional<User> findByIdWithFaculty(Integer id);

    @Query("SELECT u FROM User u LEFT JOIN FETCH u.faculty f WHERE u.email = :email")
    Optional<User> findByEmailWithFaculty(String email);
    boolean existsByEmail(String email);

    @Query("SELECT u.email FROM User u WHERE u.newEventNotifications = true AND u.active = true")
    List<String> findEmailsWithNewEventNotifications();

}
