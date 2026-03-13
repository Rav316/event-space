package ru.alex.eventspaceapi.http.filter;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpMethod;
import org.springframework.web.filter.OncePerRequestFilter;

public abstract class FilterBase extends OncePerRequestFilter {
    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        String requestURI = request.getRequestURI();
        String method = request.getMethod();

        if (requestURI.equals("/api/auth/register") ||
                requestURI.equals("/api/auth/login") ||
                requestURI.equals("/api/auth/refresh-token") ||
                requestURI.startsWith("/api/docs") ||
                requestURI.startsWith("/api/actuator")) {
            return true;
        }

        return method.equalsIgnoreCase(HttpMethod.GET.toString()) && (
                        requestURI.startsWith("/api/users/exists-by-email")
        );
    }
}
