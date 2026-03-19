package ru.alex.eventspaceapi.http.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ru.alex.eventspaceapi.dto.building.BuildingCreateDto;
import ru.alex.eventspaceapi.dto.building.BuildingDeleteImpactDto;
import ru.alex.eventspaceapi.dto.building.BuildingEditDto;
import ru.alex.eventspaceapi.dto.building.BuildingReadDto;
import ru.alex.eventspaceapi.service.BuildingService;

import java.util.List;

import static org.springframework.http.HttpStatus.*;

@RestController
@RequestMapping("/api/buildings")
@RequiredArgsConstructor
public class BuildingController {
    private final BuildingService buildingService;

    @GetMapping
    public List<BuildingReadDto> findAll() {
        return buildingService.findAll();
    }

    @GetMapping("/exists-by-name")
    public ResponseEntity<Boolean> existsByName(@RequestParam(name = "name") String name) {
        return new ResponseEntity<>(buildingService.existsByName(name), OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<BuildingReadDto> create(@Validated @RequestBody BuildingCreateDto buildingCreateDto) {
        return new ResponseEntity<>(buildingService.create(buildingCreateDto), CREATED);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<BuildingReadDto> update(
            @PathVariable Integer id,
            @Validated @RequestBody BuildingEditDto buildingEditDto
    ) {
        return new ResponseEntity<>(buildingService.update(id, buildingEditDto), OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/{id}/delete-impact")
    public ResponseEntity<BuildingDeleteImpactDto> getDeleteImpact(@PathVariable Integer id) {
        return new ResponseEntity<>(buildingService.getDeleteImpact(id), OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBuilding(@PathVariable Integer id) {
        buildingService.delete(id);
        return new ResponseEntity<>(NO_CONTENT);
    }
}
