package ru.alex.eventspaceapi.http.handler;

import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.exceptions.TokenExpiredException;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.server.ResponseStatusException;
import ru.alex.eventspaceapi.dto.response.ErrorResponse;
import ru.alex.eventspaceapi.util.ExceptionUtils;

import java.time.Instant;
import java.util.*;

import static org.springframework.http.HttpStatus.*;
import static org.springframework.http.HttpStatus.GONE;

@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidationException(MethodArgumentNotValidException ex) {
        Map<String, List<String>> errors = new TreeMap<>();

        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();

            errors.computeIfAbsent(fieldName, key -> new ArrayList<>()).add(errorMessage);
        });

        errors.values().forEach(Collections::sort);

        ErrorResponse errorResponse = new ErrorResponse(
                Instant.now(),
                errors
        );
        return new ResponseEntity<>(errorResponse, BAD_REQUEST);
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<ErrorResponse> handleDataIntegrityViolation(DataIntegrityViolationException ex) {
        ErrorResponse errorResponse = new ErrorResponse(
                Instant.now(),
                ExceptionUtils.getSqlExceptionMessage(ex)
        );
        return new ResponseEntity<>(errorResponse, CONFLICT);
    }

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleNotFoundException(EntityNotFoundException ex) {
        ErrorResponse errorResponse = new ErrorResponse(
                Instant.now(),
                ex.getMessage()
        );
        return new ResponseEntity<>(errorResponse, NOT_FOUND);
    }

    @ExceptionHandler(JWTVerificationException.class)
    public ResponseEntity<ErrorResponse> handleUnauthorizedException(RuntimeException ex) {
        ErrorResponse errorResponse = new ErrorResponse(
                Instant.now(),
                ex.getMessage()
        );
        return new ResponseEntity<>(errorResponse, UNAUTHORIZED);
    }

    @ExceptionHandler(TokenExpiredException.class)
    public ResponseEntity<ErrorResponse> handleTokenExpiredException(RuntimeException ex) {
        ErrorResponse errorResponse = new ErrorResponse(
                Instant.now(),
                ex.getMessage()
        );
        return new ResponseEntity<>(errorResponse, GONE);
    }

    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity<ErrorResponse> handleResponseStatusException(ResponseStatusException ex) {
        ErrorResponse errorResponse = new ErrorResponse(
                Instant.now(),
                ex.getReason() != null ? ex.getReason() : ex.getStatusCode().toString()
        );
        return new ResponseEntity<>(errorResponse, ex.getStatusCode());
    }

    @ExceptionHandler({
            IllegalArgumentException.class,
            IllegalStateException.class
    })
    public ResponseEntity<ErrorResponse> handleBadRequestException(RuntimeException ex) {
        ErrorResponse errorResponse = new ErrorResponse(
                Instant.now(),
                ex.getMessage()
        );
        return new ResponseEntity<>(errorResponse, BAD_REQUEST);
    }
}
