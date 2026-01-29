package ru.alex.emailnotificationservice.config;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.AccessDeniedHandler;
import ru.alex.emailnotificationservice.http.handler.ErrorResponseHandler;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {
    @Value("${app.metrics.username}")
    private String metricsUsername;
    @Value("${app.metrics.password}")
    private String metricsPassword;

    private final PasswordEncoder passwordEncoder;
    private final ErrorResponseHandler errorResponseHandler;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider(actuatorUserDetailsService());
        authProvider.setPasswordEncoder(passwordEncoder);

        AuthenticationManager localAuthManager = new ProviderManager(authProvider);

        http.securityMatcher("/api/actuator","/api/actuator/**")
                .authorizeHttpRequests(auth -> auth
                        .anyRequest().hasRole("MONITORING"))
                .httpBasic(Customizer.withDefaults())
                .authenticationManager(localAuthManager)
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
        return http.build();
    }

    @Bean
    public AccessDeniedHandler accessDeniedHandler() {
        return (request, response, accessDeniedException) ->
                errorResponseHandler.writeErrorResponse(response, HttpStatus.FORBIDDEN, HttpStatus.FORBIDDEN.toString());
    }

    @Bean
    public UserDetailsService actuatorUserDetailsService() {
        return new InMemoryUserDetailsManager(
                User.builder()
                        .username(metricsUsername)
                        .password(passwordEncoder.encode(metricsPassword))
                        .roles("MONITORING")
                        .build()
        );
    }
}
