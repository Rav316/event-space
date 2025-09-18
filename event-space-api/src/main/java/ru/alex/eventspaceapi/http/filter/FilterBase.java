package ru.alex.eventspaceapi.http.filter;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpMethod;
import org.springframework.web.filter.OncePerRequestFilter;

public abstract class FilterBase extends OncePerRequestFilter {
    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        String requestURI = request.getRequestURI();
        String method = request.getMethod();

        if (requestURI.startsWith("/api/auth") ||
                requestURI.startsWith("/swagger-ui") ||
                requestURI.startsWith("/v3/api-docs")) {
            return true;
        }

        return method.equalsIgnoreCase(HttpMethod.GET.toString()) && (
                requestURI.startsWith("/api/faculties") || requestURI.startsWith("/api/users/exists-by-email")
        );
    }
}
