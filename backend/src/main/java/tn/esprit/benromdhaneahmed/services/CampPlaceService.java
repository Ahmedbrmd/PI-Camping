package tn.esprit.benromdhaneahmed.services;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import tn.esprit.benromdhaneahmed.entities.CampPlace;
import tn.esprit.benromdhaneahmed.entities.CampPlaceCategory;
import tn.esprit.benromdhaneahmed.entities.DTO.CampPlaceSelectDto;
import tn.esprit.benromdhaneahmed.entities.Event;
import tn.esprit.benromdhaneahmed.entities.State;
import tn.esprit.benromdhaneahmed.repositories.*;

import java.util.Arrays;
import java.util.List;

@Service
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE)
@AllArgsConstructor
public class CampPlaceService implements ICampPlaceService {
    private final CampPlaceRepository campPlaceRepository;

    @Override
    public List<CampPlace> getAllCampPlaces() {
        return campPlaceRepository.findAll();
    }

    @Override
    public CampPlace getCampPlaceById(int id) {
        return campPlaceRepository.findById(id).orElse(null);
    }

    @Override
    @Transactional
    public void addCampPlace(CampPlace campPlace) {
        if (campPlace.getEvents() != null) {
            for (Event event : campPlace.getEvents()) {
                event.setCampPlace(campPlace);
            }
        }
        campPlaceRepository.saveAndFlush(campPlace);
    }

    @Override
    public void updateCampPlace(CampPlace campPlace) {
        campPlaceRepository.save(campPlace);

    }

    @Override
    public void deleteCampPlace(int id) {
        campPlaceRepository.deleteById(id);

    }
    @Override
    public List<CampPlaceCategory> getCategories() {
        List<CampPlaceCategory> categories = Arrays.asList(CampPlaceCategory.values());
        return categories;
    }
    @Override
    public List<State> getState() {
        List<State> states = Arrays.asList(State.values());
        return states;
    }
    @Override
    public List<CampPlace> getCampPlaceByCategory(CampPlaceCategory category){
        return campPlaceRepository.findTop4ByCategory(category);
    }
    @Transactional
    @Override
    public Page<CampPlace> getFiltredCampPlace(List <CampPlaceCategory> category, List <State> state, String search, Pageable pageable){
        return campPlaceRepository.findByCampPlaceCategoryInAndStateInWithSearch(category, state, search,pageable);
    }


    // for home screen
    @Override
    public List<CampPlace> findTop5CampPlaces() {
        return campPlaceRepository.findTop5ByOrderByIdCampPlaceAsc();
    }

    @Override
    public long campPlacesCount(){
        return this.campPlaceRepository.count();
    }
    @Override
    public List<CampPlaceSelectDto> getCampPlaceSelect(){
        return this.campPlaceRepository.findAllCampPlaces();
    }

}
