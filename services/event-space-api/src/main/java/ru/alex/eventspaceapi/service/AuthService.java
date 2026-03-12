package ru.alex.eventspaceapi.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.CacheManager;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import ru.alex.eventspaceapi.database.entity.Faculty;
import ru.alex.eventspaceapi.database.entity.User;
import ru.alex.eventspaceapi.database.repository.FacultyRepository;
import ru.alex.eventspaceapi.database.repository.UserRepository;
import ru.alex.eventspaceapi.dto.auth.JwtTokenData;
import ru.alex.eventspaceapi.dto.auth.RefreshTokenDto;
import ru.alex.eventspaceapi.dto.response.AuthResponse;
import ru.alex.eventspaceapi.dto.user.UserDeleteDto;
import ru.alex.eventspaceapi.dto.user.UserLoginDto;
import ru.alex.eventspaceapi.dto.user.UserPasswordChangeDto;
import ru.alex.eventspaceapi.dto.user.UserRegisterDto;
import ru.alex.eventspaceapi.exception.FacultyNotFoundException;
import ru.alex.eventspaceapi.exception.UserNotFoundException;
import ru.alex.eventspaceapi.mapper.user.UserReadMapper;
import ru.alex.eventspaceapi.mapper.user.UserRegisterMapper;
import ru.alex.eventspaceapi.model.Role;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Objects;

import static org.springframework.http.HttpStatus.FORBIDDEN;
import static ru.alex.eventspaceapi.util.AuthUtils.getAuthorizedUser;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class AuthService {
    @Value("${app.account.deletion-confirmation-phrase}")
    private String deletionConfirmationPhrase;


    private final CacheManager cacheManager;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final FacultyRepository facultyRepository;
    private final UserRegisterMapper userRegisterMapper;
    private final UserReadMapper userReadMapper;

    @Transactional
    public AuthResponse register(UserRegisterDto userRegisterDto) {
        User user = userRegisterMapper.toEntity(userRegisterDto);
        if(user.getRole() == Role.ADMIN) {
            throw new ResponseStatusException(FORBIDDEN);
        }
        Faculty faculty = facultyRepository.findById(userRegisterDto.faculty())
                .orElseThrow(() -> new FacultyNotFoundException(userRegisterDto.faculty()));
        user.setFaculty(faculty);
        user.setPassword(passwordEncoder.encode(userRegisterDto.password()));
        return new AuthResponse(
                userReadMapper.toDto(userRepository.save(user)),
                jwtService.generateAccessToken(user.getId(), user.getEmail()),
                jwtService.generateRefreshToken(user.getId(), user.getEmail())
        );
    }

    public AuthResponse login(UserLoginDto userLoginDto) {
        UsernamePasswordAuthenticationToken authInputToken = new UsernamePasswordAuthenticationToken(
                userLoginDto.email(),
                userLoginDto.password()
        );
        authenticationManager.authenticate(authInputToken);

        User user = userRepository.findByEmailWithFaculty(userLoginDto.email())
                .orElseThrow(() -> new UsernameNotFoundException("Failed to retrieve user: " + userLoginDto.email()));
        return new AuthResponse(
                userReadMapper.toDto(user),
                jwtService.generateAccessToken(user.getId(), user.getEmail()),
                jwtService.generateRefreshToken(user.getId(), user.getEmail())
        );
    }


    @Transactional
    public AuthResponse changePassword(UserPasswordChangeDto userPasswordChangeDto) {
        Integer id = Objects.requireNonNull(getAuthorizedUser()).id();
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));
        UsernamePasswordAuthenticationToken authInputToken = new UsernamePasswordAuthenticationToken(
                user.getEmail(),
                userPasswordChangeDto.currentPassword()
        );
        authenticationManager.authenticate(authInputToken);
        if(!userPasswordChangeDto.newPassword().equals(userPasswordChangeDto.confirmPassword())) {
            throw new IllegalArgumentException("newPassword and confirmPassword do not match");
        }
        String password = passwordEncoder.encode(userPasswordChangeDto.confirmPassword());
        user.setPassword(password);
        user.setPasswordChangedAt(Instant.now());
        Objects.requireNonNull(cacheManager.getCache("users")).evict(user.getId());

        return new AuthResponse(
                userReadMapper.toDto(user),
                jwtService.generateAccessToken(user.getId(), user.getEmail()),
                jwtService.generateRefreshToken(user.getId(), user.getEmail())
        );
    }

    @Transactional
    public void deleteAccount(UserDeleteDto userDeleteDto) {
        Integer id = Objects.requireNonNull(getAuthorizedUser()).id();
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));
        if(!userDeleteDto.confirmationPhrase().equals(deletionConfirmationPhrase)) {
            throw new IllegalArgumentException("confirmation phrase incorrect");
        }

        UsernamePasswordAuthenticationToken authInputToken = new UsernamePasswordAuthenticationToken(
                user.getEmail(),
                userDeleteDto.currentPassword()
        );
        authenticationManager.authenticate(authInputToken);

        userRepository.delete(user);
        Objects.requireNonNull(cacheManager.getCache("users")).evict(user.getId());

    }

    public AuthResponse refreshAccessToken(RefreshTokenDto refreshTokenDto) {
        JwtTokenData tokenData = jwtService.validateRefreshToken(refreshTokenDto.refreshToken());
        User user = userRepository.findByIdWithFaculty(tokenData.id())
                .orElseThrow(() -> new UsernameNotFoundException("Failed to retrieve user: " + tokenData.id()));
        if (user.getPasswordChangedAt() != null && tokenData.issuedAt().isBefore(user.getPasswordChangedAt().truncatedTo(ChronoUnit.SECONDS))) {
            throw new ResponseStatusException(FORBIDDEN, "Refresh token was issued before password change");
        }
        return new AuthResponse(
                userReadMapper.toDto(user),
                jwtService.generateAccessToken(user.getId(), user.getEmail()),
                jwtService.generateRefreshToken(user.getId(), user.getEmail())
        );
    }
}
