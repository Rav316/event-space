package ru.alex.eventspaceapi.util;

import lombok.experimental.UtilityClass;
import ru.alex.eventspaceapi.database.entity.Event;

import java.time.LocalDate;
import java.time.LocalTime;

@UtilityClass
public class EventUtils {
    public static boolean isEventPassed(Event event) {
        LocalDate now = LocalDate.now();
        return event.getEventDate().isBefore(now) ||
                (event.getEventDate().isEqual(now) && event.getEndTime().isBefore(LocalTime.now()));
    }

    public static boolean isEventStarted(Event event) {
        LocalDate now = LocalDate.now();
        return (event.getEventDate().isEqual(now) && event.getStartTime().isBefore(LocalTime.now()));
    }
}
