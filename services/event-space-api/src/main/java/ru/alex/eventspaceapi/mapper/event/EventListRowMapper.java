package ru.alex.eventspaceapi.mapper.event;

import org.jspecify.annotations.Nullable;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;
import ru.alex.eventspaceapi.dto.building.BuildingReadDto;
import ru.alex.eventspaceapi.dto.event.EventListDto;
import ru.alex.eventspaceapi.dto.eventCategory.EventCategoryReadDto;
import ru.alex.eventspaceapi.dto.space.SpaceReadDto;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDate;
import java.time.LocalTime;

@Component
public class EventListRowMapper implements RowMapper<EventListDto> {
    @Override
    public @Nullable EventListDto mapRow(ResultSet rs, int rowNum) throws SQLException {
        EventCategoryReadDto category = rs.getInt("category_id") == 0
                ? null
                : new EventCategoryReadDto(
                rs.getInt("category_id"),
                rs.getString("category_name"),
                rs.getString("category_color")
        );

        SpaceReadDto space = rs.getInt("space_id") == 0
                ? null
                : new SpaceReadDto(
                rs.getInt("space_id"),
                rs.getString("space_name"),
                rs.getShort("space_capacity"),
                new BuildingReadDto(
                        rs.getInt("building_id"),
                        rs.getString("building_name"),
                        rs.getString("building_address"),
                        null,
                        null
                )
        );

        LocalDate eventDate = rs.getDate("event_date").toLocalDate();
        LocalTime startTime = rs.getTime("start_time").toLocalTime();
        LocalTime endTime = rs.getTime("end_time").toLocalTime();

        boolean isRegistered = rs.getBoolean("is_registered");
        Boolean isAttended = rs.getObject("is_attended") != null
                ? rs.getBoolean("is_attended")
                : null;

        String qrToken = rs.getString("qr_token");

        LocalDate nowDate = LocalDate.now();
        LocalTime nowTime = LocalTime.now();

        boolean canRegister =
                eventDate.isAfter(nowDate)
                        || (eventDate.equals(nowDate) && startTime.isAfter(nowTime));

        boolean canUnregister =
                isRegistered
                        && !Boolean.TRUE.equals(isAttended)
                        && (eventDate.isAfter(nowDate)
                        || (eventDate.equals(nowDate) && endTime.isAfter(nowTime)));

        return new EventListDto(
                rs.getInt("id"),
                rs.getString("name"),
                category,
                rs.getString("short_description"),
                rs.getString("image_url"),
                eventDate,
                startTime,
                endTime,
                rs.getDate("deadline") != null
                        ? rs.getDate("deadline").toLocalDate()
                        : null,
                space,
                rs.getLong("registered_users"),
                rs.getInt("participant_quantity"),
                rs.getString("author"),
                isRegistered,
                canRegister,
                canUnregister,
                isAttended,
                qrToken
        );
    }
}
