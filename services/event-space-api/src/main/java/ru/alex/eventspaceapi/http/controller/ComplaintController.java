package ru.alex.eventspaceapi.http.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.alex.eventspaceapi.dto.complaint.ComplaintCreateDto;
import ru.alex.eventspaceapi.dto.complaintType.ComplaintTypeReadDto;
import ru.alex.eventspaceapi.service.ComplaintService;
import ru.alex.eventspaceapi.service.ComplaintTypeService;

import java.util.List;

import static org.springframework.http.HttpStatus.CREATED;

@RestController
@RequestMapping("/api/complaints")
@RequiredArgsConstructor
public class ComplaintController {
    private final ComplaintService complaintService;
    private final ComplaintTypeService complaintTypeService;

    @GetMapping("/types")
    public List<ComplaintTypeReadDto> findAll() {
        return complaintTypeService.findAll();
    }

    @PostMapping
    public ResponseEntity<Void> leaveComplaint(@Validated @RequestBody ComplaintCreateDto complaintCreateDto) {
        complaintService.create(complaintCreateDto);
        return new ResponseEntity<>(CREATED);
    }
}
