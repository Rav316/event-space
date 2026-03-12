package ru.alex.eventspaceapi.http.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.alex.eventspaceapi.dto.filter.SpaceFilter;
import ru.alex.eventspaceapi.dto.space.SpaceListDto;
import ru.alex.eventspaceapi.dto.spaceType.SpaceTypeReadDto;
import ru.alex.eventspaceapi.service.SpaceService;
import ru.alex.eventspaceapi.service.SpaceTypeService;

import java.util.List;

@RestController
@RequestMapping("/api/spaces")
@RequiredArgsConstructor
public class SpaceController {
    private final SpaceService spaceService;
    private final SpaceTypeService spaceTypeService;

    @GetMapping
    public List<SpaceListDto> findAllByFilter(@Validated @ModelAttribute SpaceFilter filter) {
        return spaceService.findAllByFilter(filter);
    }

    @GetMapping("/types")
    public List<SpaceTypeReadDto> findAllSpaceTypes() {
        return spaceTypeService.findAll();
    }
}
