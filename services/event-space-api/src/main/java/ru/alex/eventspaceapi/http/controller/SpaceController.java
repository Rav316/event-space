package ru.alex.eventspaceapi.http.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ru.alex.eventspaceapi.dto.filter.SpaceFilter;
import ru.alex.eventspaceapi.dto.space.SpaceCreateDto;
import ru.alex.eventspaceapi.dto.space.SpaceDeleteImpactDto;
import ru.alex.eventspaceapi.dto.space.SpaceEditDto;
import ru.alex.eventspaceapi.dto.space.SpaceListDto;
import ru.alex.eventspaceapi.dto.spaceType.SpaceTypeReadDto;
import ru.alex.eventspaceapi.service.SpaceService;
import ru.alex.eventspaceapi.service.SpaceTypeService;

import java.util.List;

import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.NO_CONTENT;
import static org.springframework.http.HttpStatus.OK;

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

    @GetMapping("/exists-by-name-and-building")
    public ResponseEntity<Boolean> existsByNameAndBuilding(
            @RequestParam(name = "name") String name,
            @RequestParam(name = "building") Integer building
    ) {
        return new ResponseEntity<>(spaceService.existsByNameAndBuilding(name, building), OK);
    }

    @GetMapping("/types")
    public List<SpaceTypeReadDto> findAllSpaceTypes() {
        return spaceTypeService.findAll();
    }

    @PostMapping
    public ResponseEntity<SpaceListDto> create(@Validated @RequestBody SpaceCreateDto spaceCreateDto) {
        return new ResponseEntity<>(spaceService.create(spaceCreateDto), CREATED);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<SpaceListDto> update(
            @PathVariable Integer id,
            @Validated @RequestBody SpaceEditDto spaceEditDto
    ) {
        return new ResponseEntity<>(spaceService.update(id, spaceEditDto), OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/{id}/delete-impact")
    public ResponseEntity<SpaceDeleteImpactDto> getDeleteImpact(@PathVariable Integer id) {
        return new ResponseEntity<>(spaceService.getDeleteImpact(id), OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        spaceService.delete(id);
        return new ResponseEntity<>(NO_CONTENT);
    }
}
