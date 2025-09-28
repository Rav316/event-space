package ru.alex.eventspaceapi.http.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.alex.eventspaceapi.dto.spaceType.SpaceTypeReadDto;
import ru.alex.eventspaceapi.service.SpaceTypeService;

import java.util.List;

@RestController
@RequestMapping("/api/space-types")
@RequiredArgsConstructor
public class SpaceTypeController {
    private final SpaceTypeService spaceTypeService;

    @GetMapping
    public List<SpaceTypeReadDto> findAll() {
        return spaceTypeService.findAll();
    }
}
