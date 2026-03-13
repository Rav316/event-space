package ru.alex.eventspaceapi.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.alex.eventspaceapi.database.entity.Complaint;
import ru.alex.eventspaceapi.database.entity.ComplaintType;
import ru.alex.eventspaceapi.database.entity.Event;
import ru.alex.eventspaceapi.database.entity.EventReview;
import ru.alex.eventspaceapi.database.repository.ComplaintRepository;
import ru.alex.eventspaceapi.database.repository.ComplaintTypeRepository;
import ru.alex.eventspaceapi.database.repository.EventRepository;
import ru.alex.eventspaceapi.database.repository.EventReviewRepository;
import ru.alex.eventspaceapi.database.repository.UserRepository;
import ru.alex.eventspaceapi.dto.complaint.ComplaintCreateDto;
import ru.alex.eventspaceapi.dto.complaint.ComplaintListDto;
import ru.alex.eventspaceapi.dto.complaint.ComplaintReviewDto;
import ru.alex.eventspaceapi.dto.filter.AdminListFilter;
import ru.alex.eventspaceapi.exception.ComplaintNotFoundException;
import ru.alex.eventspaceapi.exception.ComplaintTypeNotFoundException;
import ru.alex.eventspaceapi.exception.EventNotFoundException;
import ru.alex.eventspaceapi.exception.EventReviewNotFoundException;
import ru.alex.eventspaceapi.mapper.complaint.ComplaintCreateMapper;
import ru.alex.eventspaceapi.mapper.complaint.ComplaintListMapper;
import ru.alex.eventspaceapi.model.ComplaintStatus;
import ru.alex.eventspaceapi.model.ComplaintTargetType;
import tools.jackson.databind.ObjectMapper;

import java.time.Instant;
import java.time.LocalDate;
import java.util.Map;
import java.util.Objects;

import static ru.alex.eventspaceapi.util.AuthUtils.getAuthorizedUser;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ComplaintService {
    private final ComplaintRepository complaintRepository;
    private final ComplaintTypeRepository complaintTypeRepository;
    private final EventReviewRepository eventReviewRepository;
    private final EventRepository eventRepository;
    private final UserRepository userRepository;
    private final ComplaintCreateMapper complaintCreateMapper;
    private final ComplaintListMapper complaintListMapper;
    private final ObjectMapper objectMapper;

    public Page<ComplaintListDto> findAll(AdminListFilter filter, Sort sort) {
        return complaintRepository.findAll(filter, sort)
                .map(complaintListMapper::toDto);
    }

    @Transactional
    public void create(ComplaintCreateDto dto) {
        Complaint complaint = complaintCreateMapper.toEntity(dto);

        ComplaintTargetType targetType = ComplaintTargetType.values()[dto.targetType()];
        complaint.setTargetType(targetType);
        complaint.setTargetId(dto.targetId());
        complaint.setTargetSnapshot(buildSnapshot(targetType, dto.targetId()));

        ComplaintType complaintType = complaintTypeRepository.findById(dto.complaintType())
                .orElseThrow(() -> new ComplaintTypeNotFoundException(dto.complaintType()));
        complaint.setComplaintType(complaintType);

        complaint.setAuthor(userRepository.getReferenceById(Objects.requireNonNull(getAuthorizedUser()).id()));
        complaint.setComplaintDate(LocalDate.now());
        complaint.setStatus(ComplaintStatus.UNDER_CONSIDERATION);

        complaintRepository.save(complaint);
    }

    @Transactional
    public void reviewComplaint(Integer id, ComplaintReviewDto dto) {
        Complaint complaint = complaintRepository.findById(id)
                .orElseThrow(() -> new ComplaintNotFoundException(id));
        complaint.setAdminComment(dto.comment());
        complaint.setStatus(dto.resolved() ? ComplaintStatus.RESOLVED : ComplaintStatus.REJECTED);
        complaint.setReviewedBy(userRepository.getReferenceById(Objects.requireNonNull(getAuthorizedUser()).id()));
        complaint.setReviewedAt(Instant.now());
    }

    private String buildSnapshot(ComplaintTargetType targetType, Integer targetId) {
        return switch (targetType) {
            case EVENT_REVIEW -> {
                EventReview review = eventReviewRepository.findById(targetId)
                        .orElseThrow(() -> new EventReviewNotFoundException(targetId));
                yield objectMapper.writeValueAsString(Map.of(
                        "title", review.getTitle(),
                        "content", review.getContent(),
                        "rating", review.getRating(),
                        "authorFirstName", review.getAuthor().getFirstName(),
                        "authorLastName", review.getAuthor().getLastName()
                ));
            }
            case EVENT -> {
                Event event = eventRepository.findById(targetId)
                        .orElseThrow(() -> new EventNotFoundException(targetId));
                yield objectMapper.writeValueAsString(Map.of(
                        "name", event.getName(),
                        "shortDescription", event.getShortDescription()
                ));
            }
        };
    }
}
