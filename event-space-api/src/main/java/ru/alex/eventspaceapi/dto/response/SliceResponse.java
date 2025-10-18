package ru.alex.eventspaceapi.dto.response;

import org.springframework.data.domain.Slice;

import java.util.List;

public record SliceResponse<T>(
        List<T> content,
        Metadata metadata
) {
    public static <T> SliceResponse<T> of(Slice<T> slice) {
        Metadata metadata = new Metadata(slice.getNumber(), slice.getSize());
        return new SliceResponse<>(slice.getContent(), metadata);
    }

    public record Metadata (
            int page,
            int size
    ) {

    }
}
