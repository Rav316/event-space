package ru.alex.eventspaceapi.database.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "event_user")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EventUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "event_id", referencedColumnName = "id")
    private Event event;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @Builder.Default
    private Boolean attended = false;

    private UUID qrToken;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "confirmed_by", referencedColumnName = "id")
    private User confirmedBy;

    @Column(name = "confirmed_at")
    private Instant confirmedAt;
}
