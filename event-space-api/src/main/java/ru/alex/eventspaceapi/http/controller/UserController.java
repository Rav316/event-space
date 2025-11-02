package ru.alex.eventspaceapi.http.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import ru.alex.eventspaceapi.dto.eventUser.UserStatisticsDto;
import ru.alex.eventspaceapi.dto.user.UserDeleteDto;
import ru.alex.eventspaceapi.dto.user.UserEditDto;
import ru.alex.eventspaceapi.dto.user.UserPasswordChangeDto;
import ru.alex.eventspaceapi.dto.user.UserReadDto;
import ru.alex.eventspaceapi.service.AuthService;
import ru.alex.eventspaceapi.service.EventUserService;
import ru.alex.eventspaceapi.service.UserService;

import static org.springframework.http.HttpStatus.NO_CONTENT;
import static org.springframework.http.HttpStatus.OK;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    private final AuthService authService;
    private final UserService userService;
    private final EventUserService eventUserService;

    @GetMapping("/exists-by-email")
    public ResponseEntity<Boolean> existsByEmail(@RequestParam("email") String email) {
        return new ResponseEntity<>(userService.existsByEmail(email), OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserReadDto> update(
            @PathVariable("id") Integer id,
            @Validated @RequestPart("user") UserEditDto userEditDto,
            @RequestPart(value = "avatar", required = false) MultipartFile avatar
            ) {
        return new ResponseEntity<>(userService.update(id, userEditDto, avatar), OK);
    }

    @GetMapping("/profile/details-statistics")
    public ResponseEntity<UserStatisticsDto> getUserStatistics() {
        return new ResponseEntity<>(eventUserService.getUserStatistics(), OK);
    }

    @PatchMapping("/profile/change-password")
    public ResponseEntity<Void> changePassword(
            @Validated @RequestBody UserPasswordChangeDto userPasswordChangeDto
    ) {
        authService.changePassword(userPasswordChangeDto);
        return new ResponseEntity<>(OK);
    }

    @PostMapping("/profile/delete")
    public ResponseEntity<Void> deleteAccount(@Validated @RequestBody UserDeleteDto userDeleteDto) {
        authService.deleteAccount(userDeleteDto);
        return new ResponseEntity<>(NO_CONTENT);
    }
}
