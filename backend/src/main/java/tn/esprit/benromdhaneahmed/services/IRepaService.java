package tn.esprit.benromdhaneahmed.services;

import tn.esprit.benromdhaneahmed.entities.Event;
import tn.esprit.benromdhaneahmed.entities.Repas;

import java.util.List;

public interface IRepaService {
    List<Repas> getAllRepas();

    Repas addRepas(Repas repas);
    void updateRepas(Repas repas);
    void deleteRepas(Long id);
}
