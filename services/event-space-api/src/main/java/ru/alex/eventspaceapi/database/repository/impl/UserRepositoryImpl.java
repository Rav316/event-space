package ru.alex.eventspaceapi.database.repository.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Component;
import ru.alex.eventspaceapi.database.repository.UserRepositoryCustom;
import ru.alex.eventspaceapi.dto.user.TopOrganizerDto;
import ru.alex.eventspaceapi.mapper.user.TopOrganizerRowMapper;

import java.util.Collections;
import java.util.List;

@Component
@RequiredArgsConstructor
public class UserRepositoryImpl implements UserRepositoryCustom {
    private final NamedParameterJdbcTemplate jdbcTemplate;
    private final TopOrganizerRowMapper topOrganizerRowMapper;

    @Override
    public List<TopOrganizerDto> getTopOrganizers() {
        String sql = """
                SELECT
                    u.id,
                    u.first_name,
                    u.last_name,
                    u.avatar_url,
                    COUNT(DISTINCT e.id) AS events_count,
                    ROUND(AVG(er.rating)::numeric, 1) AS avg_rating
                FROM users u
                JOIN event e ON e.author = u.id
                LEFT JOIN event_review er ON er.event_id = e.id
                WHERE u.is_active = true
                GROUP BY u.id, u.first_name, u.last_name, u.avatar_url
                HAVING COUNT(DISTINCT e.id) > 0
                ORDER BY events_count DESC
                LIMIT 6
                """;

        return jdbcTemplate.query(sql, Collections.emptyMap(), topOrganizerRowMapper);
    }
}
