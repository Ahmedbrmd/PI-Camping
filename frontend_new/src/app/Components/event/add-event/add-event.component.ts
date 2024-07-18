import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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
  files: File[] = [];
  selectedCategory : any;
  event: Event = new Event("", "", new Date(), new Date(),0,0,"","");
  campPlaces : any;
  categories :string[]=[];

  constructor(private eventService: EventService,private campPlaceService: CampPlaceService,private route: ActivatedRoute){
  }

  ngOnInit(): void {

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


  upsertEvent(eventNgForm: NgForm){
    if (eventNgForm.valid == false || this.files.length < 1) {
      console.log(eventNgForm.errors);
      return;
    }

    if(this.event.idEvent >0){
      this.eventService.updateEvent(this.event, this.files[0]).subscribe(
        reponse =>{
          console.log('Event updated successfully');
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your event has been saved',
            showConfirmButton: false,
            timer: 2500
          });
          eventNgForm.resetForm();
          this.files = [];
        },
        error=>{
          console.log(error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong! Unable to upload image',
          });
        }
      );
    }else{
      this.eventService.addEvent(this.event, this.files[0]).subscribe(
        reponse =>{
          console.log('Event added successfully');
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your event has been saved',
            showConfirmButton: false,
            timer: 2500
          });
          eventNgForm.resetForm();
          this.files = [];
        },
        error=>{
          console.log(error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong! Unable to upload image',
          });
        }
      );
    }

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

