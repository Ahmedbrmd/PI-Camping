package tn.esprit.benromdhaneahmed.entities.DTO;

import jakarta.persistence.Lob;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;
import jakarta.persistence.OneToMany;
import tn.esprit.benromdhaneahmed.entities.CampPlaceCategory;
import tn.esprit.benromdhaneahmed.entities.Event;
import tn.esprit.benromdhaneahmed.entities.State;

import java.util.List;
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CampPlaceDto {
    private Integer idCampPlace;
    private String name;
    private CampPlaceCategory category;
    private int tel;
    private String email;
    private String address;
    private State state;
    private String description;
    private Double longitude ;
    private Double latitude;
    @Lob
    private String image;
    @OneToMany
    private List<Event> events;

}

