import { formatDate } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams  } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Page } from '../Models/page';
import { Observable } from 'rxjs';
import { Event } from '../Models/Event';
import { EventFilterDto } from '../Models/dto/eventFilterDto';
import { RelevantEvent } from '../Models/dto/RelevantEventDto';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  apiurl = "http://localhost:8084/camping/";

  constructor(private httpClient: HttpClient){}


  addEvent(event: Event, file:File) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'multipart/form-data');
console.log(event);
   return  this.httpClient.post(this.apiurl + 'event'+'/addevent', event) ;

  }

  updateEvent(event: Event, file:File) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'multipart/form-data');

   return  this.httpClient.put(this.apiurl + 'event', this.convertEventToFormData(event,file)) ;

  }

  
    getAllEvent() {
      return this.httpClient.get('http://localhost:8084/camping/event');
    }

  getEventById(id: any){
    return this.httpClient.get<Event>(this.apiurl+'event/'+id);
  }

  getFilteredEvents(eventFilterDto: EventFilterDto, page: number, size: number): Observable<Page<Event>> {
    let params = new HttpParams();
    if (eventFilterDto.categories && eventFilterDto.categories.length > 0) {
      params = params.append('categories', eventFilterDto.categories.toString());
    }
    params = params.append('minPrice', eventFilterDto.minPrice.toString());
    params = params.append('maxPrice', eventFilterDto.maxPrice.toString());
    params = params.append('startDate', formatDate(eventFilterDto.startDate, 'yyyy-MM-dd', 'en-US'));
    params = params.append('endDate', formatDate(eventFilterDto.endDate, 'yyyy-MM-dd', 'en-US'));
    params = params.append('page', page.toString());
    params = params.append('size', size.toString());
    params = params.append('sort', eventFilterDto.sort);
    params = params.append('search', eventFilterDto.searchTerm);


    return this.httpClient.get<Page<Event>>(this.apiurl + 'event/filteredEvents', { params });
  }

  getEventCategories(){
    return this.httpClient.get<string[]>(this.apiurl+'event/categories');

  }

  getRelevantEvent(category:any){
    return this.httpClient.get<RelevantEvent[]>(this.apiurl+'event/relevantEvent/'+category);

  }

  getEventsCount(){
    return this.httpClient.get<number>(this.apiurl+'event/eventCount');

  }

  deleteEvent(id:any){
    return this.httpClient.delete<string[]>(this.apiurl+'event/'+id);

  }

  
  convertEventToFormData(event: Event, file:File): FormData{
    console.log(event);
    const formData = new FormData();
    formData.append('idEvent', event.idEvent);
    formData.append('name', event.name);
    formData.append('description', event.description);
    formData.append('startDate', formatDate(event.startDate, 'yyyy-MM-dd', 'en-US'));
    formData.append('endDate', formatDate(event.endDate, 'yyyy-MM-dd', 'en-US'));
    formData.append('nbParticipant', event.nbParticipant.toString());
    formData.append('category', event.category.toString());
    formData.append('price', event.price.toString());
    formData.append('idCampPlace', event.idCampPlace!.toString());
   /* formData.append('image', file, file.name);*/
    return formData;
  }
}
