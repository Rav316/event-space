package ru.alex.eventspaceapi.model;

import org.springframework.security.core.GrantedAuthority;

public enum Role implements GrantedAuthority {
    ADMIN,
    ORGANIZER,
    PARTICIPANT;

    @Override
    public String getAuthority() {
        return name();
    }
}
