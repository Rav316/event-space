package ru.alex.eventspaceapi.database.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import ru.alex.eventspaceapi.model.Role;

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
@EqualsAndHashCode(exclude = "faculty")
@Builder
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

    @Column(name = "isActive")
    @Builder.Default
    private boolean active = true;

    @Column(name = "register_date")
    @CreationTimestamp
    private LocalDate registerDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "faculty_id", referencedColumnName = "id")
    private Faculty faculty;

    @ManyToMany(mappedBy = "users")
    @Builder.Default
    private Set<Event> events = new HashSet<>();

    @OneToMany(mappedBy = "author")
    private List<Event> createdEvents;
}
