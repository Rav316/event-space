package ru.alex.eventspaceapi.http.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import ru.alex.eventspaceapi.dto.user.TopOrganizerDto;
import ru.alex.eventspaceapi.dto.user.UserDeleteDto;
import ru.alex.eventspaceapi.dto.user.UserEditDto;
import ru.alex.eventspaceapi.dto.user.UserReadDto;
import ru.alex.eventspaceapi.dto.user.UserRoleChangeDto;
import ru.alex.eventspaceapi.mapper.user.UserBlockDto;
import ru.alex.eventspaceapi.service.AuthService;
import ru.alex.eventspaceapi.service.UserService;

import java.util.List;

import static org.springframework.http.HttpStatus.NO_CONTENT;
import static org.springframework.http.HttpStatus.OK;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    private final AuthService authService;
    private final UserService userService;

    @GetMapping("/top-organizers")
    public List<TopOrganizerDto> getTopOrganizers() {
        return userService.getTopOrganizers();
    }

    @GetMapping("/exists-by-email")
    public ResponseEntity<Boolean> existsByEmail(@RequestParam("email") String email) {
        return new ResponseEntity<>(userService.existsByEmail(email), OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserReadDto> update(
            @PathVariable Integer id,
            @Validated @RequestPart("user") UserEditDto userEditDto,
            @RequestPart(value = "avatar", required = false) MultipartFile avatar,
            @RequestPart(value = "avatarRemoved", required = false) Boolean avatarRemoved
            ) {
        return new ResponseEntity<>(userService.update(id, userEditDto, avatar, avatarRemoved), OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/block")
    public ResponseEntity<Void> blockUsers(@RequestBody List<Integer> userIds) {
        userService.blockUsers(userIds);
        return new ResponseEntity<>(OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PatchMapping("/{id}/role")
    public ResponseEntity<Void> changeUserRole(@PathVariable Integer id, @Validated @RequestBody UserRoleChangeDto userRoleChangeDto) {
        userService.changeUserRole(id, userRoleChangeDto.role());
        return new ResponseEntity<>(OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/{id}/block")
    public ResponseEntity<Void> blockUser(@PathVariable Integer id, @RequestBody UserBlockDto userBlockDto) {
        userService.blockUser(id, userBlockDto);
        return new ResponseEntity<>(OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/{id}/unlcok")
    public ResponseEntity<Void> unlockUser(@PathVariable Integer id) {
        userService.unlockUser(id);
        return new ResponseEntity<>(OK);
    }

    @PostMapping("/profile/delete")
    public ResponseEntity<Void> deleteAccount(@Validated @RequestBody UserDeleteDto userDeleteDto) {
        authService.deleteAccount(userDeleteDto);
        return new ResponseEntity<>(NO_CONTENT);
    }
}
