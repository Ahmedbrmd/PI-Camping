package tn.esprit.benromdhaneahmed.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;
import tn.esprit.benromdhaneahmed.entities.CampPlace;
import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.benromdhaneahmed.entities.CampPlaceCategory;
import tn.esprit.benromdhaneahmed.entities.DTO.CampPlaceSelectDto;
import tn.esprit.benromdhaneahmed.entities.State;

import java.util.List;


public interface CampPlaceRepository extends JpaRepository<CampPlace, Integer> {
    List<CampPlace> findTop4ByCategory(CampPlaceCategory category);
    @Query("SELECT c FROM CampPlace c WHERE " +
            "(:search IS NULL OR c.name LIKE %:search% OR c.description LIKE %:search%) AND " +
            "c.category IN :categories AND " +
            "c.state IN :states")
    Page<CampPlace> findByCampPlaceCategoryInAndStateInWithSearch(
            @Param("categories") List<CampPlaceCategory> categories,
            @Param("states") List<State> states,
            @Param("search") String search,
            Pageable pageable);
    List<CampPlace> findTop5ByOrderByIdCampPlaceAsc();


    @Query("SELECT new tn.esprit.benromdhaneahmed.entities.DTO.CampPlaceSelectDto(c.idCampPlace, c.name) FROM CampPlace c")
    List<CampPlaceSelectDto> findAllCampPlaces();
    long count();



}
