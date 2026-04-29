package ru.alex.eventspaceapi.database.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import ru.alex.eventspaceapi.model.Role;

import java.time.Instant;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(exclude = "program")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    private String email;
    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;
    private Short course;
    private String description;
    private String phone;

    @Column(name = "avatar_url")
    private String avatarUrl;

    @Column(name = "tg_username")
    private String tgUsername;

    @Column(name = "vk_url")
    private String vkUrl;

    @Column(name = "github_url")
    private String githubUrl;

    @Column(name = "new_event_notifications")
    private boolean newEventNotifications = false;

    @Column(name = "isActive")
    private boolean active = true;

    @Column(name = "register_date")
    @CreationTimestamp
    private LocalDate registerDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "program_id", referencedColumnName = "id")
    private Program program;

    @OneToMany(mappedBy = "user")
    private List<EventUser> eventUsers;

    @OneToMany(mappedBy = "author")
    private List<Event> createdEvents;

    @Column(name = "password_changed_at")
    private Instant passwordChangedAt;

    @Column(name = "blocking_reason")
    private String blockingReason;
}
