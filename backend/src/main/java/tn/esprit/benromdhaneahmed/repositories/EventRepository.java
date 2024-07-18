package tn.esprit.benromdhaneahmed.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import tn.esprit.benromdhaneahmed.entities.DTO.CampPlaceSelectDto;
import tn.esprit.benromdhaneahmed.entities.DTO.EventDto;
import tn.esprit.benromdhaneahmed.entities.Event;
import tn.esprit.benromdhaneahmed.entities.EventCategory;

import java.util.List;
import java.util.Optional;

public interface EventRepository extends JpaRepository<Event, Integer> {


    @Query("SELECT new tn.esprit.benromdhaneahmed.entities.DTO.EventDto(c.idEvent, c.name) FROM Event c")
    List<EventDto> findAllEvent();

    List<Event> findTop4ByCategory(EventCategory category);
    List<Event> findTop10ByCampPlaceIdCampPlace(Integer campPlaceId);
    long count();
}
