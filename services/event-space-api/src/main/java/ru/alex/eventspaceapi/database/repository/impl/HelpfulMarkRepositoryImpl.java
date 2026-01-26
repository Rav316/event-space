package ru.alex.eventspaceapi.database.repository.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.stereotype.Component;
import ru.alex.eventspaceapi.database.repository.HelpfulMarkRepositoryCustom;

@Component
@RequiredArgsConstructor
public class HelpfulMarkRepositoryImpl implements HelpfulMarkRepositoryCustom {
    private final NamedParameterJdbcTemplate jdbcTemplate;

    @Override
    public void markReviewAsHelpful(Integer reviewId, Integer userId) {
        String sql = """
                INSERT INTO helpful_mark(user_id, review_id)
                VALUES
                (:userId, :reviewId)
                """;
        SqlParameterSource params = new MapSqlParameterSource()
                .addValue("reviewId", reviewId)
                .addValue("userId", userId);
        jdbcTemplate.update(sql, params);
    }

    @Override
    public void unmarkReviewAsHelpful(Integer reviewId, Integer userId) {
        String sql = """
                DELETE FROM helpful_mark
                WHERE review_id = :reviewId AND user_id = :userId
                """;
        SqlParameterSource params = new MapSqlParameterSource()
                .addValue("reviewId", reviewId)
                .addValue("userId", userId);
        jdbcTemplate.update(sql, params);
    }
}
