package ru.alex.eventspaceapi.database.repository;

public interface HelpfulMarkRepositoryCustom {
    void markReviewAsHelpful(Integer reviewId, Integer userId);

    void unmarkReviewAsHelpful(Integer reviewId, Integer userId);
}
