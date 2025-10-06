package ru.alex.eventspaceapi.database.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "event_user")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EventUser {

    @EmbeddedId
    private EventUserId id;

    @Embeddable
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class EventUserId implements java.io.Serializable {
        @Column(name = "event_id")
        private Integer eventId;

        @Column(name = "user_id")
        private Integer userId;
    }
}
