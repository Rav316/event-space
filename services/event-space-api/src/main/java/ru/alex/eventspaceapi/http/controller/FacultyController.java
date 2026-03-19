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
import ru.alex.eventspaceapi.dto.faculty.FacultyCreateDto;
import ru.alex.eventspaceapi.dto.faculty.FacultyDeleteImpactDto;
import ru.alex.eventspaceapi.dto.faculty.FacultyEditDto;
import ru.alex.eventspaceapi.dto.faculty.FacultyListDto;
import ru.alex.eventspaceapi.dto.faculty.FacultyReadDto;
import ru.alex.eventspaceapi.service.FacultyService;

import java.util.List;

import static org.springframework.http.HttpStatus.*;

@RestController
@RequestMapping("/api/faculties")
@RequiredArgsConstructor
public class FacultyController {
    private final FacultyService facultyService;

    @GetMapping
    public List<FacultyListDto> findAll() {
        return facultyService.findAll();
    }

    @GetMapping("/exists-by-name")
    public ResponseEntity<Boolean> existsByName(@RequestParam(name = "name") String name) {
        return new ResponseEntity<>(facultyService.existsByName(name), OK);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<FacultyReadDto> create(@Validated @RequestBody FacultyCreateDto facultyCreateDto) {
        return new ResponseEntity<>(facultyService.create(facultyCreateDto), CREATED);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<FacultyReadDto> update(
            @PathVariable Integer id,
            @Validated @RequestBody FacultyEditDto facultyEditDto
            ) {
        return new ResponseEntity<>(facultyService.update(id, facultyEditDto), OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/{id}/delete-impact")
    public ResponseEntity<FacultyDeleteImpactDto> getDeleteImpact(@PathVariable Integer id) {
        return new ResponseEntity<>(facultyService.getDeleteImpact(id), OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        facultyService.delete(id);
        return new ResponseEntity<>(NO_CONTENT);
    }
}
