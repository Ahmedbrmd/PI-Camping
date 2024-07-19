package tn.esprit.benromdhaneahmed.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.benromdhaneahmed.entities.Product;
import tn.esprit.benromdhaneahmed.entities.Repas;

public interface RepasRepository extends JpaRepository<Repas, Long> {
}
