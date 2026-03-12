package ru.alex.eventspaceapi.database.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import ru.alex.eventspaceapi.model.ComplaintStatus;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Complaint {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "author_id", referencedColumnName = "id")
    private User author;

    private String target;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "complaint_type_id", referencedColumnName = "id")
    private ComplaintType complaintType;

    @Column(name = "complaint_date")
    private LocalDate complaintDate;

    @Enumerated(EnumType.STRING)
    private ComplaintStatus status;

    private String description;
}
