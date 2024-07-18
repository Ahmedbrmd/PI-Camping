package tn.esprit.benromdhaneahmed.services;

import tn.esprit.benromdhaneahmed.entities.DTO.EventDto;
import tn.esprit.benromdhaneahmed.entities.Event;
import tn.esprit.benromdhaneahmed.entities.EventCategory;

import java.util.List;

public interface IEventService {
    List<Event> getAllEvents();
    Object getEventeById (int id);

    Event addEvent (Event event);
    void updateEvent(Event event);
    void deleteEvent(int id);
    List<EventCategory> getCategories();

    List<Event> getRelevantEvent(EventCategory category);
    List<Event> getEventsByCampPlace(Integer campPlaceId);

    long eventCount();
}