package ru.alex.eventspaceapi.dto.event;

import java.time.LocalDate;
import java.time.LocalTime;

public record EventQrInfoDto (
        String name,
        LocalDate date,
        LocalTime startTime,
        LocalTime endTime,
        String space,
        String address
) {
}
