package tn.esprit.benromdhaneahmed.entities;

import lombok.*;
import jakarta.persistence.*;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Image {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Setter(AccessLevel.NONE)
        private int id;
        private String url;

        @Lob
        @Column(columnDefinition = "TEXT")
        private String image;
    }
