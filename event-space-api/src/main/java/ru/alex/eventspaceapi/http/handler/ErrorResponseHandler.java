package ru.alex.eventspaceapi.http.handler;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import ru.alex.eventspaceapi.dto.response.ErrorResponse;

import java.io.IOException;
import java.io.PrintWriter;
import java.time.Instant;

@Component
@RequiredArgsConstructor
public class ErrorResponseHandler {
    private final ObjectMapper objectMapper;

    public void writeErrorResponse(HttpServletResponse response, HttpStatus status, String message) {
        response.setStatus(status.value());
        response.setContentType("application/json");

        ErrorResponse errorResponse = new ErrorResponse(
                Instant.now(),
                message
        );

        try (PrintWriter writer = response.getWriter()) {
            String json = objectMapper.writeValueAsString(errorResponse);
            writer.write(json);
        } catch (IOException e) {
            throw new RuntimeException("Failed to write error response", e);
        }
    }
}
