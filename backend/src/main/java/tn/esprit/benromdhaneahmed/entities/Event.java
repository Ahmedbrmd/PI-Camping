package tn.esprit.benromdhaneahmed.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import jakarta.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idEvent;
    private String name;

    @Column(length = 1000)
    private String description;

    private Date startDate ;
    private Date endDate ;
    private  int nbParticipant;
    private double price;
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Image> images;


    @Enumerated(EnumType.STRING)
    private EventCategory category;
    // bi
    @ManyToOne
    private CampPlace campPlace;

    @OneToMany(mappedBy = "event")
    @JsonIgnore
    private List<Reservation> reservations;


}
