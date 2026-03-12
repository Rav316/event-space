package ru.alex.eventspaceapi.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.alex.eventspaceapi.database.entity.Complaint;
import ru.alex.eventspaceapi.database.entity.ComplaintType;
import ru.alex.eventspaceapi.database.repository.ComplaintRepository;
import ru.alex.eventspaceapi.database.repository.ComplaintTypeRepository;
import ru.alex.eventspaceapi.database.repository.UserRepository;
import ru.alex.eventspaceapi.dto.complaint.ComplaintCreateDto;
import ru.alex.eventspaceapi.exception.ComplaintTypeNotFoundException;
import ru.alex.eventspaceapi.mapper.complaint.ComplaintCreateMapper;
import ru.alex.eventspaceapi.model.ComplaintStatus;

import java.time.LocalDate;
import java.util.Objects;

import static ru.alex.eventspaceapi.util.AuthUtils.getAuthorizedUser;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ComplaintService {
    private final ComplaintRepository complaintRepository;
    private final ComplaintTypeRepository complaintTypeRepository;
    private final UserRepository userRepository;
    private final ComplaintCreateMapper complaintCreateMapper;

    @Transactional
    public void create(ComplaintCreateDto dto) {
        Complaint complaint = complaintCreateMapper.toEntity(dto);

        ComplaintType complaintType = complaintTypeRepository.findById(dto.complaintType())
                .orElseThrow(() -> new ComplaintTypeNotFoundException(dto.complaintType()));
        complaint.setComplaintType(complaintType);

        complaint.setAuthor(userRepository.getReferenceById(Objects.requireNonNull(getAuthorizedUser()).id()));
        complaint.setComplaintDate(LocalDate.now());
        complaint.setStatus(ComplaintStatus.UNDER_CONSIDERATION);

        complaintRepository.save(complaint);
    }
}
