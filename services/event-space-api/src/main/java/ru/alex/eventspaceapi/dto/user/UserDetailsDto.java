package ru.alex.eventspaceapi.dto.user;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import ru.alex.eventspaceapi.model.Role;

import java.time.Instant;
import java.util.Collection;
import java.util.Collections;

public record UserDetailsDto(
        Integer id,
        String firstName,
        String lastName,
        String email,
        String password,
        Role role,
        boolean active,
        String blockingReason,
        Instant passwordChangedAt
) implements UserDetails {
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singletonList(role);
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }
}
