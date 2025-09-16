package ru.alex.eventspaceapi.validation.impl;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import ru.alex.eventspaceapi.validation.ValidPassword;

public class PasswordValidator implements ConstraintValidator<ValidPassword, String> {
    private static final String PASSWORD_PATTERN = "^[a-zA-Z0-9@#$%^&+=]*$";

    @Override
    public boolean isValid(String password, ConstraintValidatorContext context) {
        if (password == null) {
            return true;
        }

        return !password.contains(" ") && password.matches(PASSWORD_PATTERN);
    }
}
