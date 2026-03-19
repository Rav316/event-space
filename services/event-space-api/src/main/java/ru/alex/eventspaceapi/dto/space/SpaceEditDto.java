package ru.alex.eventspaceapi.dto.space;

import io.github.rav316.nullablevalue.NullableValue;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class SpaceEditDto {
        @Size(min = 3, max = 64)
        @NotNull
        private NullableValue<String> name = NullableValue.undefined();
        @NotNull
        private NullableValue<Integer> building = NullableValue.undefined();
        @NotNull
        private NullableValue<Integer> type = NullableValue.undefined();
        private NullableValue<Short> floor = NullableValue.undefined();
        @NotNull
        private NullableValue<Short> capacity = NullableValue.undefined();
}