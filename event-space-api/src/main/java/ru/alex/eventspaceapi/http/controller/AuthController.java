package ru.alex.eventspaceapi.http.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import ru.alex.eventspaceapi.dto.response.AuthResponse;
import ru.alex.eventspaceapi.dto.user.UserLoginDto;
import ru.alex.eventspaceapi.dto.user.UserRegisterDto;
import ru.alex.eventspaceapi.service.AuthService;
import ru.alex.eventspaceapi.service.JwtService;

import static org.springframework.http.HttpStatus.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    @Value("${app.security.jwt.refresh-token.expiration}")
    private long refreshTokenExpirationTime;

    private final AuthService authService;
    private final JwtService jwtService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Validated @RequestBody UserRegisterDto userRegisterDto) {
        AuthResponse authResponse = authService.register(userRegisterDto);
        String refreshToken = jwtService.generateRefreshToken(authResponse.user().email());

        return ResponseEntity.status(CREATED)
                .header(HttpHeaders.SET_COOKIE, createTokenCookie(refreshToken).toString())
                .body(authResponse);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Validated @RequestBody UserLoginDto userLoginDto) {
        AuthResponse authResponse = authService.login(userLoginDto);
        String refreshToken = jwtService.generateRefreshToken(authResponse.user().email());

        return ResponseEntity.status(OK)
                .header(HttpHeaders.SET_COOKIE, createTokenCookie(refreshToken).toString())
                .body(authResponse);
    }

    @PutMapping("/refresh-token")
    public ResponseEntity<AuthResponse> refreshAccessToken(@CookieValue(name = "token", required = false) String token) {
        if(token == null) {
            throw new ResponseStatusException(UNAUTHORIZED, "refresh token is missing");
        }
        AuthResponse authResponse = authService.refreshAccessToken(token);
        String refreshToken = jwtService.generateRefreshToken(authResponse.user().email());

        return ResponseEntity.status(OK)
                .header(HttpHeaders.SET_COOKIE, createTokenCookie(refreshToken).toString())
                .body(authResponse);
    }

    private ResponseCookie createTokenCookie(String refreshToken) {
        return ResponseCookie.from("token", refreshToken)
                .httpOnly(true)
                .path("/api/auth")
                .maxAge(refreshTokenExpirationTime / 1000)
                .build();
    }
}
