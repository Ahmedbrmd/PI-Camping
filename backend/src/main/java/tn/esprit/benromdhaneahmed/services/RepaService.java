package tn.esprit.benromdhaneahmed.services;


import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import tn.esprit.benromdhaneahmed.entities.Event;
import tn.esprit.benromdhaneahmed.entities.Repas;
import tn.esprit.benromdhaneahmed.repositories.RepasRepository;

import java.util.List;

@Service
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE)
@AllArgsConstructor
public class RepaService implements  IRepaService{
    private RepasRepository repasRepository;
    @Override
    public List<Repas> getAllRepas() {
        return repasRepository.findAll();
    }

    @Override
    public Repas addRepas(Repas repas) {
        return repasRepository.save(repas);
    }

    @Override
    public void updateRepas(Repas repas) {
        repasRepository.save(repas);
    }

    @Override
    public void deleteRepas(Long id) {
       repasRepository.deleteById(id);
    }
}
