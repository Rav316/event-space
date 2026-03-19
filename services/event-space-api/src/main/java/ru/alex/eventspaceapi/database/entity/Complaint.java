package ru.alex.eventspaceapi.database.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;
import ru.alex.eventspaceapi.model.ComplaintStatus;
import ru.alex.eventspaceapi.model.ComplaintTargetType;

import java.time.Instant;
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

    @Enumerated(EnumType.STRING)
    @Column(name = "target_type")
    private ComplaintTargetType targetType;

    @Column(name = "target_id")
    private Integer targetId;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "target_snapshot", columnDefinition = "jsonb")
    private String targetSnapshot;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "complaint_type_id", referencedColumnName = "id")
    private ComplaintType complaintType;

    @Column(name = "complaint_date")
    private LocalDate complaintDate;

    @Enumerated(EnumType.STRING)
    private ComplaintStatus status;

    private String description;

    private String adminComment;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reviewed_by", referencedColumnName = "id")
    private User reviewedBy;

    @Column(name = "reviewed_at")
    private Instant reviewedAt;
}
