package ru.alex.eventspaceapi.http.filter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.MDC;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import ru.alex.eventspaceapi.dto.user.UserDetailsDto;

import java.io.IOException;
import java.util.Objects;

@Component
public class MdcFilter extends FilterBase {
    @Override
    protected void doFilterInternal(
            HttpServletRequest request, HttpServletResponse response, FilterChain filterChain
    ) throws ServletException, IOException {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if(authentication != null && authentication.isAuthenticated() &&
                    authentication.getPrincipal() instanceof UserDetailsDto principal) {
                MDC.put("userId", "userId: " + Objects.requireNonNull(principal).id());
            }
            filterChain.doFilter(request, response);
        } finally {
            MDC.clear();
        }
    }
}
