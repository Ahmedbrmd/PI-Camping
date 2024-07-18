package tn.esprit.benromdhaneahmed.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;
import tn.esprit.benromdhaneahmed.entities.CampPlace;
import tn.esprit.benromdhaneahmed.entities.DTO.EventDto;
import tn.esprit.benromdhaneahmed.entities.Event;
import tn.esprit.benromdhaneahmed.entities.EventCategory;
import tn.esprit.benromdhaneahmed.services.ICampPlaceService;
import tn.esprit.benromdhaneahmed.services.IEventService;

import java.util.List;

@Tag(name = "Event Management")
@RestController
@CrossOrigin(origins = "http://localhost:4200/")
@RequiredArgsConstructor
@RequestMapping("event")
public class EventRestController {

    private final IEventService iEventService;
    private final ICampPlaceService iCampPlaceService ;


   @GetMapping
    public List<Event> getAllEvents() {
        return iEventService.getAllEvents();
    }

    @PostMapping("/addevent")
    public Event addEvent(@RequestBody Event event) {
        return iEventService.addEvent(event);
    }

    @GetMapping("/categories")
    public List<EventCategory> getCategories() {
        return iEventService.getCategories();
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable int id) {
        iEventService.deleteEvent(id);
    }


    public void update(@RequestBody Event event){
        iEventService.updateEvent(event);
    }

/*
    @GetMapping("relevantEvent/{category}")
    public List<RelevantEvent> getRelevantEvent(@PathVariable  EventCategory category) {
        List<RelevantEvent> relevantEvents = new ArrayList<RelevantEvent>();
        for (Event event : iEventService.getRelevantEvent(category)) {
            RelevantEvent relevantEvent = modelMapper.map(event, RelevantEvent.class);
            relevantEvents.add(relevantEvent);
        }
        return relevantEvents;
    }*/

/*

    @GetMapping("/filteredEvents")
    public Page<Event> getFilteredEvents(
            @RequestParam(required = false) List<EventCategory> categories,
            @RequestParam(required = false, defaultValue = "0.0") Double minPrice,
            @RequestParam(required = false, defaultValue = "100000.0") Double maxPrice,
            @RequestParam(required = false, defaultValue = "2020-01-01") @DateTimeFormat(pattern = "yyyy-MM-dd") Date startDate,
            @RequestParam(required = false, defaultValue = "2050-12-12") @DateTimeFormat(pattern = "yyyy-MM-dd") Date endDate,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "6") int size,
            @RequestParam(required = false,defaultValue = "id,asc") String sort,
            @RequestParam(required = false,defaultValue = "") String search

    ) {
        if (categories == null) {
            categories = Arrays.asList(EventCategory.values());
        }

        Pageable pageable = PageRequest.of(page, size, getSort(sort));

        return iEventService.getFilteredEvents(
                categories,
                minPrice,
                maxPrice,
                startDate,
                endDate,
                search,
                pageable
        );
    }*/

    @GetMapping("eventByCampPlace")
    public List<Event> getEventsByCampPlace(Integer campPlaceId){
        return iEventService.getEventsByCampPlace(campPlaceId);
    }
    private Sort getSort(String sort) {
        String[] sortParams = sort.split(",");
        String property = sortParams[0];
        String direction = sortParams[1];
        return Sort.by(Sort.Direction.fromString(direction), property);
    }
    @GetMapping("eventCount")
    public long getEventsCount(){
        return this.iEventService.eventCount();
    }

}