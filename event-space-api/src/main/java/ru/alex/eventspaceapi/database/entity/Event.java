package ru.alex.eventspaceapi.database.entity;

import io.hypersistence.utils.hibernate.type.array.StringArrayType;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Type;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = {"id", "name", "tags", "eventDate", "startTime", "endTime", "description", "imageUrl"})
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;

    @Type(StringArrayType.class)
    @Column(
            name = "tags",
            columnDefinition = "text[]"
    )
    private String[] tags;

    @Column(name = "event_date")
    private LocalDate eventDate;

    @Column(name = "start_time")
    private LocalTime startTime;

    @Column(name = "end_time")
    private LocalTime endTime;

    private LocalDate deadline;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "space_id", referencedColumnName = "id")
    private Space space;

    private String shortDescription;
    private String description;

    @Column(name = "image_url")
    private String imageUrl;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "event_category_id", referencedColumnName = "id")
    private EventCategory category;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "author", referencedColumnName = "id")
    private User author;

    @OneToMany(mappedBy = "event")
    private List<EventUser> eventUsers;

    @OneToMany(mappedBy = "event")
    private List<EventStep> steps;

    @OneToMany(mappedBy = "event")
    private List<EventReview> reviews;
}
