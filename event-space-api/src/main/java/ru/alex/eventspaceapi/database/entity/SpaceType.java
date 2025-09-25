package ru.alex.eventspaceapi.database.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "space_type")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SpaceType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;

    @OneToMany(mappedBy = "type")
    private List<Space> spaces;
}
