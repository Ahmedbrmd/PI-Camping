package tn.esprit.benromdhaneahmed.services;

import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.benromdhaneahmed.entities.DTO.EventDto;
import tn.esprit.benromdhaneahmed.entities.Event;
import tn.esprit.benromdhaneahmed.entities.EventCategory;
import tn.esprit.benromdhaneahmed.repositories.EventRepository;

import java.util.Arrays;
import java.util.List;

@Service
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE)
@AllArgsConstructor
public class EventService implements IEventService{
    @Autowired
    private final EventRepository eventRepository;


    @Override
    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    @Override
    public Object getEventeById(int id) {
        return eventRepository.findById(id).orElse(null);
    }

    @Override
    @Transactional
    public  Event addEvent(Event event) {
        return eventRepository.save(event);
    }

    @Override
    public void updateEvent(Event event) {
        eventRepository.save(event);
    }

    @Override
    public void deleteEvent(int id) {
        eventRepository.deleteById(id);
    }

    @Override
    public List<EventCategory> getCategories() {
        List<EventCategory> categories = Arrays.asList(EventCategory.values());

        return categories;
    }

    @Override
    public List<Event> getRelevantEvent(EventCategory category) {
        return eventRepository.findTop4ByCategory(category);
    }

    @Override
    public List<Event> getEventsByCampPlace(Integer campPlaceId) {
        return eventRepository.findTop10ByCampPlaceIdCampPlace(campPlaceId);
    }

    @Override
    public long eventCount() {
        return this.eventRepository.count();
    }
}
