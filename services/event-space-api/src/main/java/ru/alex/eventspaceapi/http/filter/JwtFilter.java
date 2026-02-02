package ru.alex.eventspaceapi.http.filter;

import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.exceptions.TokenExpiredException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import ru.alex.eventspaceapi.dto.auth.JwtTokenData;
import ru.alex.eventspaceapi.http.handler.ErrorResponseHandler;
import ru.alex.eventspaceapi.service.JwtService;
import ru.alex.eventspaceapi.service.UserService;

import java.io.IOException;

import static org.springframework.http.HttpStatus.GONE;
import static org.springframework.http.HttpStatus.UNAUTHORIZED;
import static ru.alex.eventspaceapi.util.AuthUtils.getJwtFromAuthHeader;

@Component
@RequiredArgsConstructor
public class JwtFilter extends FilterBase {
    private final ErrorResponseHandler errorResponseHandler;
    private final JwtService jwtService;
    private final UserService userService;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request, HttpServletResponse response, FilterChain filterChain
    ) throws ServletException, IOException {
        String authHeader = request.getHeader("Authorization");
        if(authHeader == null) {
            String requestURI = request.getRequestURI();
            if(request.getMethod().equalsIgnoreCase("GET") && (
                    (requestURI.startsWith("/api/events") &&
                            !requestURI.matches("^/api/events/\\d+/reviews/my$") &&
                            !requestURI.startsWith("/api/events/my")) ||
                    requestURI.equals("/api/users/top-organizers")
            )) {
                filterChain.doFilter(request, response);
                return;
            }
        }

        try {
            String jwt = getJwtFromAuthHeader(authHeader);

            JwtTokenData tokenData = jwtService.validateAccessToken(jwt);

            UserDetails userDetails = userService.loadById(tokenData.id());

            UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                    userDetails,
                    userDetails.getPassword(),
                    userDetails.getAuthorities()
            );

            if (SecurityContextHolder.getContext().getAuthentication() == null) {
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }

            filterChain.doFilter(request, response);
        } catch (TokenExpiredException ex) {
            errorResponseHandler.writeErrorResponse(response, GONE, ex.getMessage());
        } catch (JWTVerificationException | UsernameNotFoundException ex) {
            errorResponseHandler.writeErrorResponse(response, UNAUTHORIZED, ex.getMessage());
        }
    }
}
