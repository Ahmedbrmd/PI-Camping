package tn.esprit.benromdhaneahmed.entities;



import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

import java.util.Date;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder



public class Feedback {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    private Integer idFeedback;
    private int rating;
    private String comment ;
    private Date createAt ;
    public void setIdFeedback(Integer idFeedback) {
        this.idFeedback = idFeedback;
    }



}
