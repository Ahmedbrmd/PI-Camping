import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventService } from '../../../Services/event.service';
import { Event } from '../../../Models/Event';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent implements OnInit {
  eventForm!: FormGroup;
  eventId!: number;

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.eventForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      nbParticipant: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      imageUrl: [''] // Ensure imageUrl field is added to the form group
    });

    this.route.paramMap.subscribe(params => {
      const eventIdParam = params.get('id');
      if (eventIdParam) {
        this.eventId = +eventIdParam;
        this.loadEvent(this.eventId);
      } else {
        console.error('Event ID parameter is missing');
      }
    });
  }

  loadEvent(id: number): void {
    this.eventService.getEventById(id).subscribe(
      (event: Event) => {
        this.eventForm.patchValue(event);
      },
      error => {
        console.error('Error fetching event', error);
        // Handle error as needed
      }
    );
  }

  onSubmit(): void {
    const eventData: Event = { ...this.eventForm.value, idEvent: this.eventId };

    console.log(eventData);
    this.eventService.updateEvent(eventData).subscribe(
      response => this.handleSuccess('Event updated successfully'),
      error => this.handleError(error)
    );
  }

  deleteEvent(): void {
    this.eventService.deleteEvent(this.eventId).subscribe(
      () => {
        this.handleDeleteSuccess('Event deleted successfully');
      },
      error => {
        console.error('Error deleting event', error);
        this.handleError(error);
      }
    );
  }

  handleDeleteSuccess(message: string) {
    console.log(message);
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Your event has been deleted',
      showConfirmButton: false,
      timer: 2500
    });
    // Navigate to EventTable or appropriate route
    this.router.navigate(['/EventTable']);
  }

  handleSuccess(message: string) {
    console.log(message);
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Your event has been updated',
      showConfirmButton: false,
      timer: 2500
    });
    this.eventForm.reset();
    // Navigate to EventTable or appropriate route
    this.router.navigate(['/EventTable']);
  }

  handleError(error: any) {
    console.log(error);
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong! Unable to update event',
    });
  }
}
