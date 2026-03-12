package ru.alex.eventspaceapi.config;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import ru.alex.eventspaceapi.http.filter.JwtFilter;
import ru.alex.eventspaceapi.http.handler.ErrorResponseHandler;

@Configuration
@EnableMethodSecurity(securedEnabled = true)
@RequiredArgsConstructor
public class SecurityConfig {
    @Value("${app.metrics.username}")
    private String metricsUsername;
    @Value("${app.metrics.password}")
    private String metricsPassword;

    private final PasswordEncoder passwordEncoder;
    private final ErrorResponseHandler errorResponseHandler;
    private final JwtFilter jwtFilter;

    @Bean
    @Order(2)
    public SecurityFilterChain appChain(HttpSecurity http) {
        return http.cors(Customizer.withDefaults())
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(
                        sessionConfig -> sessionConfig.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                ).headers(
                        headers -> headers.frameOptions(HeadersConfigurer.FrameOptionsConfig::sameOrigin)
                ).exceptionHandling(
                        configurer -> configurer
                                .authenticationEntryPoint(authenticationEntryPoint())
                                .accessDeniedHandler(accessDeniedHandler())
                ).addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
                .build();

    }

    @Bean
    @Order(1)
    public SecurityFilterChain actuatorChain(HttpSecurity http) {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider(actuatorUserDetailsService());
        authProvider.setPasswordEncoder(passwordEncoder);

        AuthenticationManager localAuthManager = new ProviderManager(authProvider);
        http.securityMatcher("/api/actuator", "/api/actuator/**")
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
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public AccessDeniedHandler accessDeniedHandler() {
        return (request, response, accessDeniedException) ->
                errorResponseHandler.writeErrorResponse(response, HttpStatus.FORBIDDEN, HttpStatus.FORBIDDEN.toString());
    }

    @Bean
    public AuthenticationEntryPoint authenticationEntryPoint() {
        return ((request, response, authException) ->
                errorResponseHandler.writeErrorResponse(response, HttpStatus.FORBIDDEN, authException.getMessage()));
    }

    private UserDetailsService actuatorUserDetailsService() {
        return new InMemoryUserDetailsManager(
                User.builder()
                        .username(metricsUsername)
                        .password(passwordEncoder.encode(metricsPassword))
                        .roles("MONITORING")
                        .build()
        );
    }
}
