package tn.esprit.benromdhaneahmed.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.benromdhaneahmed.entities.Event;
import tn.esprit.benromdhaneahmed.entities.Image;

public interface ImageRepository extends JpaRepository<Image, Integer> {

}
