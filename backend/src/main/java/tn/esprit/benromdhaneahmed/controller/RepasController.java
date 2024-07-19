package tn.esprit.benromdhaneahmed.controller;


import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import tn.esprit.benromdhaneahmed.entities.Event;
import tn.esprit.benromdhaneahmed.entities.EventCategory;
import tn.esprit.benromdhaneahmed.entities.Repas;
import tn.esprit.benromdhaneahmed.services.IProduct;
import tn.esprit.benromdhaneahmed.services.IRepaService;

import java.util.List;

@RestController
@RequestMapping("/repas")
@AllArgsConstructor
public class RepasController {
    private final IRepaService repaService;
    @GetMapping
    public List<Repas> getAllRepas() {
        return repaService.getAllRepas();
    }

    @PostMapping("/addRepas")
    public Repas addRepas(@RequestBody Repas repas) {
        return repaService.addRepas(repas);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        repaService.deleteRepas(id);
    }

    @PostMapping("/updateRepas")
    public void update(@RequestBody Repas repas){
        repaService.updateRepas(repas);
    }
}
