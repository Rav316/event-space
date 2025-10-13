package ru.alex.eventspaceapi.service;

import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import ru.alex.eventspaceapi.database.entity.Faculty;
import ru.alex.eventspaceapi.database.entity.User;
import ru.alex.eventspaceapi.database.repository.FacultyRepository;
import ru.alex.eventspaceapi.database.repository.UserRepository;
import ru.alex.eventspaceapi.dto.user.UserDetailsDto;
import ru.alex.eventspaceapi.dto.user.UserEditDto;
import ru.alex.eventspaceapi.dto.user.UserReadDto;
import ru.alex.eventspaceapi.exception.FacultyNotFoundException;
import ru.alex.eventspaceapi.exception.UserNotFoundException;
import ru.alex.eventspaceapi.mapper.user.UserDetailsMapper;
import ru.alex.eventspaceapi.mapper.user.UserEditMapper;
import ru.alex.eventspaceapi.mapper.user.UserReadMapper;
import ru.alex.eventspaceapi.model.Role;

import java.util.Objects;

import static ru.alex.eventspaceapi.util.AuthUtils.getAuthorizedUser;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class UserService implements UserDetailsService {
    private final FileService fileService;
    private final UserRepository userRepository;
    private final FacultyRepository facultyRepository;
    private final UserDetailsMapper userDetailsMapper;
    private final UserReadMapper userReadMapper;
    private final UserEditMapper userEditMapper;

    @Override
    @Cacheable(value = "users", key = "#email")
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findByEmailWithFaculty(email)
                .map(userDetailsMapper::toDto)
                .orElseThrow(() -> new UsernameNotFoundException("Failed to retrieve user: " + email));
    }

    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    @Transactional
    @CacheEvict(value = "users", key = "#result.email()")
    public UserReadDto update(Integer id, UserEditDto userEditDto, MultipartFile avatar) {
        UserDetailsDto authorizedUser = Objects.requireNonNull(getAuthorizedUser());
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));
        if (!authorizedUser.id().equals(id) && authorizedUser.role() != Role.ADMIN) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        }
        userEditMapper.updateFromEntity(userEditDto, user);
        if (userEditDto.faculty() != null) {
            Faculty faculty = facultyRepository.findById(userEditDto.faculty())
                    .orElseThrow(() -> new FacultyNotFoundException(userEditDto.faculty()));
            user.setFaculty(faculty);
        }
        if (avatar != null) {
            if (avatar.isEmpty()) {
                if (user.getAvatarUrl() != null) {
                    fileService.deleteFileByUrl(user.getAvatarUrl());
                    user.setAvatarUrl(null);
                }
            } else {
                if (user.getAvatarUrl() != null) {
                    fileService.deleteFileByUrl(user.getAvatarUrl());
                }
                String avatarUrl = fileService.saveFile(avatar, "avatars");
                user.setAvatarUrl(avatarUrl);
            }
        }
        return userReadMapper.toDto(user);
    }
}
