package ru.alex.eventspaceapi.http.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import ru.alex.eventspaceapi.dto.auth.RefreshTokenDto;
import ru.alex.eventspaceapi.dto.response.AuthResponse;
import ru.alex.eventspaceapi.dto.user.UserLoginDto;
import ru.alex.eventspaceapi.dto.user.UserPasswordChangeDto;
import ru.alex.eventspaceapi.dto.user.UserRegisterDto;
import ru.alex.eventspaceapi.service.AuthService;

import static org.springframework.http.HttpStatus.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Validated @RequestBody UserRegisterDto userRegisterDto) {
        return new ResponseEntity<>(authService.register(userRegisterDto), CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Validated @RequestBody UserLoginDto userLoginDto) {
        return new ResponseEntity<>(authService.login(userLoginDto), OK);
    }

    @PutMapping("/refresh-token")
    public ResponseEntity<AuthResponse> refreshAccessToken(@Validated @RequestBody RefreshTokenDto refreshTokenDto) {
        if (refreshTokenDto.refreshToken() == null) {
            throw new ResponseStatusException(UNAUTHORIZED, "refresh token is missing");
        }
        return new ResponseEntity<>(authService.refreshAccessToken(refreshTokenDto), OK);
    }

    @PatchMapping("/profile/change-password")
    public ResponseEntity<AuthResponse> changePassword(
            @Validated @RequestBody UserPasswordChangeDto userPasswordChangeDto
    ) {
        return new ResponseEntity<>(authService.changePassword(userPasswordChangeDto), OK);
    }
}
