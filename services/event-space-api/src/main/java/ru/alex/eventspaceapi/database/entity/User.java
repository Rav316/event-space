package ru.alex.eventspaceapi.database.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import ru.alex.eventspaceapi.model.Role;

import java.time.Instant;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(exclude = {"program", "notificationCategories"})
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

    @ManyToMany
    @JoinTable(
            name = "user_notification_category",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "category_id")
    )
    private Set<EventCategory> notificationCategories = new HashSet<>();

    @Column(name = "isActive")
    private boolean active = true;

    @Column(name = "email_notifications_enabled")
    private boolean emailNotificationsEnabled = true;

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
