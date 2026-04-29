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
import ru.alex.eventspaceapi.dto.program.ProgramCreateDto;
import ru.alex.eventspaceapi.dto.program.ProgramDeleteImpactDto;
import ru.alex.eventspaceapi.dto.program.ProgramEditDto;
import ru.alex.eventspaceapi.dto.program.ProgramListDto;
import ru.alex.eventspaceapi.dto.program.ProgramReadDto;
import ru.alex.eventspaceapi.service.ProgramService;

import java.util.List;

import static org.springframework.http.HttpStatus.*;

@RestController
@RequestMapping("/api/programs")
@RequiredArgsConstructor
public class ProgramController {
    private final ProgramService programService;

    @GetMapping
    public List<ProgramListDto> findAll() {
        return programService.findAll();
    }

    @GetMapping("/exists-by-name")
    public ResponseEntity<Boolean> existsByName(@RequestParam(name = "name") String name) {
        return new ResponseEntity<>(programService.existsByName(name), OK);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ProgramReadDto> create(@Validated @RequestBody ProgramCreateDto programCreateDto) {
        return new ResponseEntity<>(programService.create(programCreateDto), CREATED);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ProgramReadDto> update(
            @PathVariable Integer id,
            @Validated @RequestBody ProgramEditDto programEditDto
            ) {
        return new ResponseEntity<>(programService.update(id, programEditDto), OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/{id}/delete-impact")
    public ResponseEntity<ProgramDeleteImpactDto> getDeleteImpact(@PathVariable Integer id) {
        return new ResponseEntity<>(programService.getDeleteImpact(id), OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        programService.delete(id);
        return new ResponseEntity<>(NO_CONTENT);
    }
}
