package ru.alex.eventspaceapi.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.alex.eventspaceapi.database.repository.EventReviewRepository;
import ru.alex.eventspaceapi.database.repository.HelpfulMarkRepository;
import ru.alex.eventspaceapi.exception.EventReviewNotFoundException;

import java.util.Objects;

import static ru.alex.eventspaceapi.util.AuthUtils.getAuthorizedUser;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class HelpfulMarkService {
    private final EventReviewRepository eventReviewRepository;
    private final HelpfulMarkRepository helpfulMarkRepository;

    @Transactional
    public void markReviewAsHelpful(Integer reviewId) {
        if(!eventReviewRepository.existsById(reviewId)) {
            throw new EventReviewNotFoundException(reviewId);
        }
        helpfulMarkRepository.markReviewAsHelpful(reviewId, Objects.requireNonNull(getAuthorizedUser()).id());
    }

    @Transactional
    public void unmarkReviewAsHelpful(Integer reviewId) {
        if(!eventReviewRepository.existsById(reviewId)) {
            throw new EventReviewNotFoundException(reviewId);
        }
        helpfulMarkRepository.unmarkReviewAsHelpful(reviewId, Objects.requireNonNull(getAuthorizedUser()).id());
    }
}
