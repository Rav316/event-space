package ru.alex.eventspaceapi.service;

import lombok.RequiredArgsConstructor;
import org.springframework.cache.Cache;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
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
import ru.alex.eventspaceapi.dto.filter.AdminListFilter;
import ru.alex.eventspaceapi.dto.user.TopOrganizerDto;
import ru.alex.eventspaceapi.dto.user.UserAdminListDto;
import ru.alex.eventspaceapi.dto.user.UserDetailsDto;
import ru.alex.eventspaceapi.dto.user.UserEditDto;
import ru.alex.eventspaceapi.dto.user.UserReadDto;
import ru.alex.eventspaceapi.exception.FacultyNotFoundException;
import ru.alex.eventspaceapi.exception.UserNotFoundException;
import ru.alex.eventspaceapi.mapper.user.UserBlockDto;
import ru.alex.eventspaceapi.mapper.user.UserListMapper;
import ru.alex.eventspaceapi.mapper.user.UserDetailsMapper;
import ru.alex.eventspaceapi.mapper.user.UserEditMapper;
import ru.alex.eventspaceapi.mapper.user.UserReadMapper;
import ru.alex.eventspaceapi.model.Role;

import java.util.List;
import java.util.Objects;

import static ru.alex.eventspaceapi.util.AuthUtils.getAuthorizedUser;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class UserService implements UserDetailsService {
    private final CacheManager cacheManager;
    private final FileService fileService;
    private final UserRepository userRepository;
    private final FacultyRepository facultyRepository;
    private final UserDetailsMapper userDetailsMapper;
    private final UserReadMapper userReadMapper;
    private final UserEditMapper userEditMapper;
    private final UserListMapper userListMapper;


    public Page<UserAdminListDto> findAll(AdminListFilter filter, Sort sort) {
        return userRepository.findAll(filter, sort)
                .map(userListMapper::toDto);
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findByEmailWithFaculty(email)
                .map(userDetailsMapper::toDto)
                .orElseThrow(() -> new UsernameNotFoundException("Failed to retrieve user: " + email));
    }

    @Cacheable(value = "users", key = "#id")
    public UserDetailsDto loadById(Integer id) {
        return userRepository.findByIdWithFaculty(id)
                .map(userDetailsMapper::toDto)
                .orElseThrow(() -> new UsernameNotFoundException("Failed to retrieve user: " + id));
    }

    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    public List<TopOrganizerDto> getTopOrganizers() {
        return userRepository.getTopOrganizers();
    }

    @Transactional
    @CacheEvict(value = "users", key = "#result.id()")
    public UserReadDto update(Integer id, UserEditDto userEditDto, MultipartFile avatar, Boolean avatarRemoved) {
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

        if(avatarRemoved != null && avatarRemoved) {
            if (user.getAvatarUrl() != null) {
                fileService.deleteFileByUrl(user.getAvatarUrl());
                user.setAvatarUrl(null);
            }
        } else {
            if (avatar != null) {
                if (user.getAvatarUrl() != null) {
                    fileService.deleteFileByUrl(user.getAvatarUrl());
                }
                String avatarUrl = fileService.saveFile(avatar, "avatars");
                user.setAvatarUrl(avatarUrl);
            }
        }

        return userReadMapper.toDto(user);
    }

    @Transactional
    public void blockUser(Integer id, UserBlockDto userBlockDto) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));
        if(!user.isActive()) {
            throw new IllegalStateException("user already blocked");
        }
        Integer authorizedUserId = Objects.requireNonNull(getAuthorizedUser()).id();
        if(id.equals(authorizedUserId)) {
            throw new IllegalStateException("you can't block yourself");
        }
        user.setActive(false);
        user.setBlockingReason(userBlockDto.reason());
        userRepository.save(user);
        Cache cache = cacheManager.getCache("users");
        if (cache != null) {
            cache.evict(id);
        }
    }

    @Transactional
    public void unlockUser(Integer id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));
        user.setActive(true);
        user.setBlockingReason(null);
        userRepository.save(user);
        Cache cache = cacheManager.getCache("users");
        if (cache != null) {
            cache.evict(id);
        }
    }

    @Transactional
    public void changeUserRole(Integer id, Integer roleIndex) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));
        Integer authorizedUserId = Objects.requireNonNull(getAuthorizedUser()).id();
        if (id.equals(authorizedUserId)) {
            throw new IllegalStateException("you can't change your own role");
        }
        user.setRole(Role.values()[roleIndex]);
        userRepository.save(user);
        Cache cache = cacheManager.getCache("users");
        if (cache != null) {
            cache.evict(id);
        }
    }

    @Transactional
    public void blockUsers(List<Integer> userIds) {
        Integer authorizedUserId = Objects.requireNonNull(getAuthorizedUser()).id();
        List<Integer> filteredUserIds = userIds
                .stream()
                .filter(id -> !id.equals(authorizedUserId))
                .toList();
        userRepository.setUsersInactive(filteredUserIds);
        Cache cache = cacheManager.getCache("users");
        if (cache != null) {
            userIds.forEach(cache::evict);
        }
    }
}
