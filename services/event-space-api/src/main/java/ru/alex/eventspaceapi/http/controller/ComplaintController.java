package ru.alex.eventspaceapi.http.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.alex.eventspaceapi.dto.complaint.ComplaintCreateDto;
import ru.alex.eventspaceapi.dto.complaint.ComplaintReviewDto;
import ru.alex.eventspaceapi.dto.complaintType.ComplaintTypeReadDto;
import ru.alex.eventspaceapi.service.ComplaintService;
import ru.alex.eventspaceapi.service.ComplaintTypeService;

import java.util.List;

import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.OK;

@RestController
@RequestMapping("/api/complaints")
@PreAuthorize("hasRole('ADMIN')")
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

    @PostMapping("/{id}/review")
    public ResponseEntity<Void> reviewComplaint(
            @PathVariable Integer id,
            @Validated @RequestBody ComplaintReviewDto complaintReviewDto
    ) {
        complaintService.reviewComplaint(id, complaintReviewDto);
        return new ResponseEntity<>(OK);
    }
}
