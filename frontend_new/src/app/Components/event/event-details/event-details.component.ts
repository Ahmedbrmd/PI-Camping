import { Component, OnInit } from '@angular/core';
import { EventService } from '../../../Services/event.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {
  event: any;
  relevantEvents: any;
  images: string[] = [
    "assets/zaghouan.jpg",
    "assets/bg3.jpg",
    "assets/tbarka.jpg",
    "assets/camp2.jpg"
  ];
  features: Feature[] = [];

  constructor(private eventService: EventService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('idEvent');
      this.eventService.getEventById(id).subscribe(
        response => {
          console.log(response);
          this.event = response;
        },
        error => {
          console.log("Error fetching event details: " + error.message);
        }
      );
      if (this.event) {
        this.eventService.getRelevantEvent(this.event.category).subscribe(
          response => {
            console.log(response);
            this.relevantEvents = response;
          },
          error => {
            console.log("Error fetching relevant events: " + error.message);
          }
        );
      }
    });
  }

  formatCategoryName(category: string): string {
    return category.toLowerCase().replaceAll('_', " ");
  }

  reservePlace(): void {
    // Code pour gérer la réservation
    if (this.event.nbParticipant > 0) {
      this.event.nbParticipant--; // Diminue le nombre de participants
      // Vous pouvez ici appeler un service pour effectuer la réservation côté serveur si nécessaire
      console.log('Booking now...');
    } else {
      console.log('No available places left');
      // Vous pouvez ajouter une notification ou un message d'erreur ici si nécessaire
    }
  }
}

class Feature {
  constructor(public type: string, public description: string, public icon: string) { }
}
