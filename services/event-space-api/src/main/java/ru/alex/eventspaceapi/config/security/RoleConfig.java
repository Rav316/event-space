package ru.alex.eventspaceapi.config.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.access.expression.method.DefaultMethodSecurityExpressionHandler;
import org.springframework.security.access.expression.method.MethodSecurityExpressionHandler;
import org.springframework.security.access.hierarchicalroles.RoleHierarchy;
import org.springframework.security.access.hierarchicalroles.RoleHierarchyImpl;
import org.aopalliance.intercept.MethodInvocation;
import org.springframework.security.authorization.DefaultAuthorizationManagerFactory;
import ru.alex.eventspaceapi.model.Role;

@Configuration
public class RoleConfig {
    @Bean
    public RoleHierarchy roleHierarchy() {
        return RoleHierarchyImpl.withDefaultRolePrefix()
                .role(Role.ADMIN.name()).implies(Role.ORGANIZER.name())
                .role(Role.ADMIN.name()).implies(Role.PARTICIPANT.name())
                .role(Role.ADMIN.name()).implies(Role.VERIFIER.name())
                .role(Role.ORGANIZER.name()).implies(Role.PARTICIPANT.name())
                .role(Role.VERIFIER.name()).implies(Role.PARTICIPANT.name())
                .build();
    }

    @Bean
    public MethodSecurityExpressionHandler methodSecurityExpressionHandler(RoleHierarchy roleHierarchy) {
        DefaultAuthorizationManagerFactory<MethodInvocation> factory = new DefaultAuthorizationManagerFactory<>();
        factory.setRoleHierarchy(roleHierarchy);
        DefaultMethodSecurityExpressionHandler handler = new DefaultMethodSecurityExpressionHandler();
        handler.setAuthorizationManagerFactory(factory);
        return handler;
    }
}
