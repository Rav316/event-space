package ru.alex.eventspaceapi.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import ru.alex.eventspaceapi.validation.impl.EnumIndexValidator;

import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = EnumIndexValidator.class)
@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
public @interface EnumIndex {
    String message() default "The value must be a valid enumeration index";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
    Class<? extends Enum<?>> enumClass();
}
