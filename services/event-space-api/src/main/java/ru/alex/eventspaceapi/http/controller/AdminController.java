package ru.alex.eventspaceapi.http.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.alex.eventspaceapi.dto.building.BuildingReadDto;
import ru.alex.eventspaceapi.dto.eventCategory.EventCategoryReadDto;
import ru.alex.eventspaceapi.dto.faculty.FacultyReadDto;
import ru.alex.eventspaceapi.dto.complaint.ComplaintListDto;
import ru.alex.eventspaceapi.dto.space.SpaceListDto;
import ru.alex.eventspaceapi.dto.event.EventAdminListDto;
import ru.alex.eventspaceapi.dto.filter.AdminListFilter;
import ru.alex.eventspaceapi.dto.response.PageResponse;
import ru.alex.eventspaceapi.dto.statistics.AdminStatisticsDto;
import ru.alex.eventspaceapi.dto.user.UserAdminListDto;
import ru.alex.eventspaceapi.service.AdminService;
import ru.alex.eventspaceapi.service.BuildingService;
import ru.alex.eventspaceapi.service.ComplaintService;
import ru.alex.eventspaceapi.service.EventService;
import ru.alex.eventspaceapi.service.EventCategoryService;
import ru.alex.eventspaceapi.service.FacultyService;
import ru.alex.eventspaceapi.service.SpaceService;
import ru.alex.eventspaceapi.service.UserService;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
@RequiredArgsConstructor
public class AdminController {
    private final AdminService adminService;
    private final UserService userService;
    private final EventService eventService;
    private final ComplaintService complaintService;
    private final BuildingService buildingService;
    private final SpaceService spaceService;
    private final EventCategoryService eventCategoryService;
    private final FacultyService facultyService;

    @GetMapping("/statistics")
    public AdminStatisticsDto getStatistics() {
        return adminService.getStatistics();
    }

    @GetMapping("/users")
    public PageResponse<UserAdminListDto> findAllUsers(@Validated @ModelAttribute AdminListFilter filter, Sort sort) {
        return PageResponse.of(userService.findAll(filter, sort));
    }

    @GetMapping("/events")
    public PageResponse<EventAdminListDto> findAllEvents(@Validated @ModelAttribute AdminListFilter filter, Sort sort) {
        return PageResponse.of(eventService.findAllByFilter(filter, sort));
    }

    @GetMapping("/complaints")
    public PageResponse<ComplaintListDto> findAllComplaints(@Validated @ModelAttribute AdminListFilter filter, Sort sort) {
        return PageResponse.of(complaintService.findAll(filter, sort));
    }

    @GetMapping("/buildings")
    public PageResponse<BuildingReadDto> findAllBuildings(@Validated @ModelAttribute AdminListFilter filter, Sort sort) {
        return PageResponse.of(buildingService.findAllByFilter(filter, sort));
    }

    @GetMapping("/spaces")
    public PageResponse<SpaceListDto> findAllSpaces(@Validated @ModelAttribute AdminListFilter filter, Sort sort) {
        return PageResponse.of(spaceService.findAllByFilter(filter, sort));
    }

    @GetMapping("/categories")
    public PageResponse<EventCategoryReadDto> findAllCategories(@Validated @ModelAttribute AdminListFilter filter, Sort sort) {
        return PageResponse.of(eventCategoryService.findAllByFilter(filter, sort));
    }

    @GetMapping("/faculties")
    public PageResponse<FacultyReadDto> findAllFaculties(@Validated @ModelAttribute AdminListFilter filter, Sort sort) {
        return PageResponse.of(facultyService.findAllByFilter(filter, sort));
    }
}
