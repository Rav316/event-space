package ru.alex.eventspaceapi.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import ru.alex.eventspaceapi.validation.impl.PasswordValidator;

import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = PasswordValidator.class)
@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
public @interface ValidPassword {
    String message() default "Password can only contain letters, digits, and @#$%^&+= symbols";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
