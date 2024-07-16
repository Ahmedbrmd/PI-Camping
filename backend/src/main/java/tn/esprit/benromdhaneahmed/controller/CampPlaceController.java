package tn.esprit.benromdhaneahmed.controller;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;


import tn.esprit.benromdhaneahmed.entities.DTO.CampPlaceSelectDto;
import tn.esprit.benromdhaneahmed.services.CampPlaceService;
import tn.esprit.benromdhaneahmed.entities.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;


@RestController
@RequestMapping("/campPlace")
@RequiredArgsConstructor
@Slf4j
public class CampPlaceController {

    private final CampPlaceService campPlaceService;


    @GetMapping
    public List<CampPlace> getAll(){
        return campPlaceService.getAllCampPlaces();
    }

    @GetMapping("/{id}")
    public CampPlace get(@PathVariable int id){
        return campPlaceService.getCampPlaceById(id);
    }
    @DeleteMapping("/{id}")
    public void delete(@PathVariable int id){
        campPlaceService.deleteCampPlace(id);
    }
    @PutMapping
    public void update(@RequestBody CampPlace campPlace){
        campPlaceService.updateCampPlace(campPlace);
    }

    @PostMapping
    public CampPlace addCampPlace(@RequestBody CampPlace campPlace) {
        campPlaceService.addCampPlace(campPlace);
        return campPlace;
    }

    @GetMapping("/categories")
    public List<CampPlaceCategory> getCategories(){
        return  campPlaceService.getCategories();
    }
    @GetMapping("/state")
    public List<State> getState(){
        return  campPlaceService.getState();
    }
    @GetMapping("/getSimilaireCampPlace/{category}")
    public List<CampPlace> getCampPlaceByCategory(@PathVariable CampPlaceCategory category){
        return campPlaceService.getCampPlaceByCategory(category);
    }

    @GetMapping("/filteredCampPlaces")
    public Page<CampPlace> getFilteredCampPlaces(
            @RequestParam(required = false) List<CampPlaceCategory> categories,
            @RequestParam(required = false) List<State> states,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "6") int size,
            @RequestParam(required = false,defaultValue = "id,asc") String sort,
            @RequestParam(required = false,defaultValue = "") String search



    ) {



        if (categories == null) {
            categories = Arrays.asList(CampPlaceCategory.values());
        }
        if (states == null) {
            states = Arrays.asList(State.values());
        }



        Pageable pageable = PageRequest.of(page, size, getSort(sort));
        return campPlaceService.getFiltredCampPlace(categories,states,search ,pageable);

    }


    @GetMapping("campPlacesCount")
    public long getcampPlacesCount(){
        return this.campPlaceService.campPlacesCount();
    }

    @GetMapping("/getCampPlaceForSelect")
    public List<CampPlaceSelectDto> getCampPlaceForSelect(){
        return this.campPlaceService.getCampPlaceSelect();
    }
    private Sort getSort(String sort) {
        String[] sortParams = sort.split(",");
        String property = sortParams[0];
        String direction = sortParams[1];
        return Sort.by(Sort.Direction.fromString(direction), property);
    }
}
