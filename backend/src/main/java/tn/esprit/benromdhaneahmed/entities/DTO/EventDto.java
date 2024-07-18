package tn.esprit.benromdhaneahmed.entities.DTO;


import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.multipart.MultipartFile;
import tn.esprit.benromdhaneahmed.entities.EventCategory;

import java.util.Date;
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class EventDto {

    private Integer idEvent;
    private String name;

    private String description;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date startDate ;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date endDate ;
    private  int nbParticipant;
    @Enumerated(EnumType.STRING)
    private EventCategory category;
    private String videoUrl ;
    private MultipartFile image;
    private double price;
    private Integer idCampPlace;


}
