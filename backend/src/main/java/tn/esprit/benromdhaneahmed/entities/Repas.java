package tn.esprit.benromdhaneahmed.entities;

import jakarta.persistence.*;
import lombok.*;
import org.apache.catalina.User;

import java.util.Date;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Repas  {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idRepas;
    private  Integer NombreRepasparjour;
    private Float Prix;
    private Integer Quantité;
    @Enumerated(EnumType.STRING)
    private TypeRepas typeRepas;

}
