import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { EventService } from '../../../Services/event.service';
import { CampPlaceService } from '../../../Services/camp-place.service';
import { Event } from '../../../Models/Event';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit{
  eventForm!: FormGroup;
  files: File[] = [];
  selectedCategory : any;
  event: Event = new Event("", "", new Date(), new Date(),0,0,"","");
  campPlaces : any;
  categories :string[]=[];

  constructor(private eventService: EventService,private campPlaceService: CampPlaceService,private route: ActivatedRoute,  private fb: FormBuilder){
  }

  initForm() {
    this.eventForm = new FormGroup({
      idCampPlace: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      startDate: new FormControl('', Validators.required),
      endDate: new FormControl('', Validators.required),
      name: new FormControl('', [Validators.required, Validators.minLength(5)]),
      description: new FormControl('', [Validators.required, Validators.minLength(50)]),
      price: new FormControl('', [Validators.required, Validators.min(1)]),
      nbParticipant: new FormControl('', [Validators.required, Validators.min(1)]),
      idEvent: new FormControl(0)
    });
  }
  ngOnInit(): void {
    this.initForm();
    this.route.paramMap.subscribe(params => {
      this.event.idEvent = params.get('idEvent');
      this.campPlaceService.getCampPlacesSelect().subscribe(
        response =>{

          this.campPlaces = response
        },
        error =>{
          console.log(error);
        }
      );
    });
    this.campPlaceService.getCampPlacesSelect().subscribe(
      response =>{

        this.campPlaces = response
      },
      error =>{
        console.log(error);
      }
    );
    this.eventService.getEventCategories().subscribe(
      response =>{

        this.categories = response
      },
      error =>{
        console.log(error);
      }
    )
  }


  upsertEvent() {
    const eventData = this.eventForm.value;
     console.log(eventData);
      this.eventService.addEvent(eventData, this.files[0]).subscribe(
        response => this.handleSuccess('Event added successfully'),
        error => this.handleError(error)
      );
  }

  handleSuccess(message: string) {
    console.log(message);
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Your event has been saved',
      showConfirmButton: false,
      timer: 2500
    });
    this.eventForm.reset();
    this.files = [];
    /*this.route.navigate(['/events']);*/ // Adjust the route as needed
  }

  handleError(error: any) {
    console.log(error);
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong! Unable to upload image',
    });
  }


	onSelect(event: any) {
		console.log(event);
		this.files.push(...event.addedFiles);
	}

	onRemove(event: any) {
		console.log(event);
		this.files.splice(this.files.indexOf(event), 1);
	}

  formatCategoryName(category: string): string {
    const formatedCategory = category.toLowerCase().replaceAll('_'," ");
    return formatedCategory;
  }

}

