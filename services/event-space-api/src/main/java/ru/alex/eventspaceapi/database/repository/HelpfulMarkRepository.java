package ru.alex.eventspaceapi.database.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import ru.alex.eventspaceapi.database.entity.HelpfulMark;

@Repository
public interface HelpfulMarkRepository extends JpaRepository<HelpfulMark, Integer>, HelpfulMarkRepositoryCustom {
    @Modifying
    @Query("DELETE FROM HelpfulMark hm WHERE hm.review.id = :reviewId")
    void deleteAllByReviewId(Integer reviewId);
}
