package ru.alex.eventspaceapi.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.alex.eventspaceapi.database.repository.UserRepository;
import ru.alex.eventspaceapi.mapper.user.UserDetailsMapper;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class UserService implements UserDetailsService {
    private final UserRepository userRepository;
    private final UserDetailsMapper userDetailsMapper;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findByEmailWithFaculty(email)
                .map(userDetailsMapper::toDto)
                .orElseThrow(() -> new UsernameNotFoundException("Failed to retrieve user: " + email));
    }
}
