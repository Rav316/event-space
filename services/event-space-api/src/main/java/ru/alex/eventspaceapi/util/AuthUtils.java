package ru.alex.eventspaceapi.util;

import com.auth0.jwt.exceptions.JWTVerificationException;
import lombok.experimental.UtilityClass;
import org.springframework.security.core.context.SecurityContextHolder;
import ru.alex.eventspaceapi.dto.user.UserDetailsDto;

@UtilityClass
public class AuthUtils {
    public static String getJwtFromAuthHeader(String authHeader) {
        if (authHeader == null || authHeader.isBlank() || !authHeader.startsWith("Bearer")) {
            throw new JWTVerificationException("JWT token is not valid");
        }

        String jwt = authHeader.substring(7);
        if (jwt.isBlank()) {
            throw new JWTVerificationException("JWT token is not valid");
        }
        return jwt;
    }

    public static UserDetailsDto getAuthorizedUser() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if(principal instanceof UserDetailsDto userDetailsDto) {
            return userDetailsDto;
        }
        return null;
    }
}
