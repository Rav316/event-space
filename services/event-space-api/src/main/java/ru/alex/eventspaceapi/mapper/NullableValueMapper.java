package ru.alex.eventspaceapi.mapper;


import io.github.rav316.nullablevalue.NullableValue;
import org.mapstruct.Condition;
import org.mapstruct.Mapper;


@Mapper(componentModel = "spring")
public interface NullableValueMapper {

    @Condition
    default <T> boolean isPresent(NullableValue<T> nullable) {
        return nullable == null || !nullable.equals(NullableValue.undefined());
    }

    default <T> T unwrap(NullableValue<T> nullable) {
        return nullable != null ? nullable.get() : null;
    }
}