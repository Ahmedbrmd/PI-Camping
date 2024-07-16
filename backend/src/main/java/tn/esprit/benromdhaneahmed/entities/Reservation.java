package tn.esprit.benromdhaneahmed.entities;

import lombok.*;
import jakarta.persistence.*;
import java.util.Date;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    private Integer idReservation;
    private Date date;
    private String notes;

    @ManyToOne
    private Event event;
}