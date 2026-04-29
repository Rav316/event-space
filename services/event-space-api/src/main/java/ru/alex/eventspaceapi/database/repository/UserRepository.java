package ru.alex.eventspaceapi.database.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import ru.alex.eventspaceapi.database.entity.User;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer>, UserRepositoryCustom {

    @Query("SELECT u FROM User u LEFT JOIN FETCH u.program f WHERE u.id = :id")
    Optional<User> findByIdWithProgram(Integer id);

    @Query("SELECT u FROM User u LEFT JOIN FETCH u.program f WHERE u.email = :email")
    Optional<User> findByEmailWithProgram(String email);
    boolean existsByEmail(String email);

    @Query("SELECT u.email FROM User u JOIN u.notificationCategories c WHERE c.id = :categoryId AND u.active = true AND u.emailNotificationsEnabled = true")
    List<String> findEmailsByNotificationCategory(Integer categoryId);

    @Modifying
    @Query("UPDATE User u SET u.active = false WHERE u.id IN :userIds")
    void setUsersInactive(List<Integer> userIds);

}
