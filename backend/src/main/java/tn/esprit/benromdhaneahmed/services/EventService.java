package tn.esprit.benromdhaneahmed.services;

import jakarta.persistence.EntityNotFoundException;
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
    @Transactional
    public  Event addEvent(Event event) {
        return eventRepository.save(event);
    }

//    @Override
//    public Event updateEvent(Event event) {
//        return eventRepository.save(event);
//    }


    public Event updateEvent(Event event) {
        // Perform any necessary validation or business logic checks

        // Ensure existing event ID is set to update the correct event
        Integer eventId = event.getIdEvent();
        if (eventId == null) {
            throw new IllegalArgumentException("Event ID must be provided for update");
        }

        // Retrieve existing event from database
        Event existingEvent = eventRepository.findById(eventId)
                .orElseThrow(() -> new EntityNotFoundException("Event not found with ID: " + eventId));

        // Update existing event with new values
        existingEvent.setName(event.getName());
        existingEvent.setDescription(event.getDescription());
        existingEvent.setStartDate(event.getStartDate());
        existingEvent.setEndDate(event.getEndDate());
        existingEvent.setNbParticipant(event.getNbParticipant());
        existingEvent.setPrice(event.getPrice());
        existingEvent.setCategory(event.getCategory());
        existingEvent.setImageUrl(event.getImageUrl()); // Update imageUrl

        // Save the updated event
        return eventRepository.save(existingEvent);
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
    public Event getEventById(int eventId) {
        return eventRepository.findById(eventId).orElse(null);
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
