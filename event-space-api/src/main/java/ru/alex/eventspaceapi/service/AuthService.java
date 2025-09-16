package ru.alex.eventspaceapi.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.alex.eventspaceapi.database.entity.Faculty;
import ru.alex.eventspaceapi.database.entity.User;
import ru.alex.eventspaceapi.database.entity.repository.FacultyRepository;
import ru.alex.eventspaceapi.database.entity.repository.UserRepository;
import ru.alex.eventspaceapi.dto.response.AuthResponse;
import ru.alex.eventspaceapi.dto.user.UserLoginDto;
import ru.alex.eventspaceapi.dto.user.UserRegisterDto;
import ru.alex.eventspaceapi.exception.FacultyNotFoundException;
import ru.alex.eventspaceapi.mapper.user.UserReadMapper;
import ru.alex.eventspaceapi.mapper.user.UserRegisterMapper;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class AuthService {
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
        Faculty faculty = facultyRepository.findById(userRegisterDto.faculty())
                .orElseThrow(() -> new FacultyNotFoundException(userRegisterDto.faculty()));
        user.setFaculty(faculty);
        user.setPassword(passwordEncoder.encode(userRegisterDto.password()));
        return new AuthResponse(
                userReadMapper.toDto(userRepository.save(user)),
                jwtService.generateAccessToken(user.getEmail())
        );
    }

    public AuthResponse login(UserLoginDto userLoginDto) {
        UsernamePasswordAuthenticationToken authInputToken = new UsernamePasswordAuthenticationToken(
                userLoginDto.email(),
                userLoginDto.password()
        );
        authenticationManager.authenticate(authInputToken);

        User user = userRepository.findByEmail(userLoginDto.email())
                .orElseThrow(() -> new UsernameNotFoundException("Failed to retrieve user: " + userLoginDto.email()));
        return new AuthResponse(
                userReadMapper.toDto(user),
                jwtService.generateAccessToken(user.getEmail())
        );
    }

    public AuthResponse refreshAccessToken(String refreshToken) {
        String email = jwtService.validateRefreshToken(refreshToken);
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Failed to retrieve user: " + email));
        return new AuthResponse(
                userReadMapper.toDto(user),
                jwtService.generateAccessToken(user.getEmail())
        );
    }
}
