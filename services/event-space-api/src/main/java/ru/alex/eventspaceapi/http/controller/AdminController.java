package ru.alex.eventspaceapi.http.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.alex.eventspaceapi.dto.filter.UserFilter;
import ru.alex.eventspaceapi.dto.response.PageResponse;
import ru.alex.eventspaceapi.dto.statistics.AdminStatisticsDto;
import ru.alex.eventspaceapi.dto.user.UserListDto;
import ru.alex.eventspaceapi.service.AdminService;
import ru.alex.eventspaceapi.service.UserService;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
@RequiredArgsConstructor
public class AdminController {
    private final AdminService adminService;
    private final UserService userService;

    @GetMapping("/statistics")
    public AdminStatisticsDto getStatistics() {
        return adminService.getStatistics();
    }

    @GetMapping("/users")
    public PageResponse<UserListDto> findAllUsers(@Validated @ModelAttribute UserFilter filter, Sort sort) {
        return PageResponse.of(userService.findAll(filter, sort));
    }
}
