package tn.esprit.benromdhaneahmed.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;
import jakarta.persistence.*;
import java.util.List;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CampPlace {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    private Integer idCampPlace;
    private String name;
    private CampPlaceCategory category;
    private int tel;
    private String email;
    private String address;
    private State state;
    @Column(length = 1000)
    private String description;
    private Double longitude ;
    private Double latitude;
    @OneToMany(mappedBy = "campPlace",cascade = CascadeType.ALL)
    @JsonIgnoreProperties("campPlace")
    private List<Event> events;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String image;

}



















