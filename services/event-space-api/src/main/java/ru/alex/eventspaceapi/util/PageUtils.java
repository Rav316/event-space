package ru.alex.eventspaceapi.util;

import lombok.experimental.UtilityClass;

import java.util.List;

@UtilityClass
public class PageUtils {
    private static final List<Integer> ALLOWED_SIZES = List.of(10, 15, 25);

    public static int getNearestPageSize(int requestedSize) {
        int nearest = ALLOWED_SIZES.getFirst();
        int minDiff = Math.abs(nearest - requestedSize);

        for (int size : ALLOWED_SIZES) {
            int diff = Math.abs(size - requestedSize);
            if (diff < minDiff || (diff == minDiff && size > nearest)) {
                nearest = size;
                minDiff = diff;
            }
        }
        return nearest;
    }
}
