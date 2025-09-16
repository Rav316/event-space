package ru.alex.eventspaceapi.validation.impl;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import ru.alex.eventspaceapi.validation.EnumIndex;

public class EnumIndexValidator implements ConstraintValidator<EnumIndex, Integer> {
    private int maxIndex;

    @Override
    public void initialize(EnumIndex constraintAnnotation) {
        maxIndex = constraintAnnotation.enumClass().getEnumConstants().length - 1;
    }

    @Override
    public boolean isValid(Integer value, ConstraintValidatorContext context) {
        boolean isValid = value == null || (value >= 0 && value <= maxIndex);
        if(!isValid) {
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate(
                    String.format("The value must be a valid enumeration index (between 0 and %d)", maxIndex)
            ).addConstraintViolation();
        }
        return isValid;
    }
}