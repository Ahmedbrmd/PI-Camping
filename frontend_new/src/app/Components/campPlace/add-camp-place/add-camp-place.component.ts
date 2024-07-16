import { Component } from '@angular/core';
import { CampPlace } from '../../../Models/campPlace.model';
import { CampPlaceService } from '../../../Services/camp-place.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-camp-place',
  templateUrl: './add-camp-place.component.html',
  styleUrls: ['./add-camp-place.component.css']
})
export class AddCampPlaceComponent {

  files: File[] = [];
  selectedCategory: any;
  campPlace: CampPlace = {
    idCampPlace: '',
    name: '',
    tel: 0,
    email: '',
    address: '',
    category: '',
    state: '',
    description: '',
    longitude: 0,
    latitude: 0,
    image: ''
  };

  categories: string[] = [];
  states: string[] = [];
  constructor(private campPlaceService: CampPlaceService) {

  }
  ngOnInit(): void {
    this.campPlaceService.getCampPlaceCategories().subscribe(
      response => {

        this.categories = response
      },
      error => {
        console.log(error);
      }
    );
    this.campPlaceService.getState().subscribe(
      response => {

        this.states = response
      },
      error => {
        console.log(error);
      }
    )
  }



  // upsertCampPlace(eventNgForm: NgForm) {
  //   if (eventNgForm.valid == false || this.files.length < 1) {
  //     console.log(eventNgForm.errors);
  //     return;
  //   }



  //   if (this.campPlace.idCampPlace > 0) {
  //     this.campPlaceService.updateCampPlace(this.campPlace, this.files).subscribe(
  //       reponse => {
  //         console.log('Event updated successfully');
  //         Swal.fire({
  //           position: 'top-end',
  //           icon: 'success',
  //           title: 'Your event has been saved',
  //           showConfirmButton: false,
  //           timer: 2500
  //         });
  //         eventNgForm.resetForm();
  //         this.files = [];
  //       },
  //       error => {
  //         console.log(error);
  //         Swal.fire({
  //           icon: 'error',
  //           title: 'Oops...',
  //           text: 'Something went wrong! Unable to upload image',
  //         });
  //       }
  //     );
  //   } else {
  //     this.campPlaceService.addCampPlace(this.campPlace, this.files).subscribe(
  //       reponse => {
  //         console.log('Event added successfully');
  //         Swal.fire({
  //           position: 'top-end',
  //           icon: 'success',
  //           title: 'Your event has been saved',
  //           showConfirmButton: false,
  //           timer: 2500
  //         });
  //         eventNgForm.resetForm();
  //         this.files = [];
  //       },
  //       error => {
  //         console.log(error);
  //         Swal.fire({
  //           icon: 'error',
  //           title: 'Oops...',
  //           text: 'Something went wrong! Unable to upload image',
  //         });
  //       }
  //     );
  //   }



  // }





  async addCampPlace(eventNgForm: NgForm) {
    if (eventNgForm.invalid || this.files.length < 1) {
      console.log(eventNgForm.errors);
      return;
    }

    try {
      const base64String = await this.campPlaceService.convertFileToBase64(this.files[0]);
      this.campPlace.image = base64String.split(',')[1];  // Extract the base64 string part

      this.campPlaceService.addCampPlace(this.campPlace).subscribe(
        response => {
          console.log('CampPlace added successfully');
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your campPlace has been saved',
            showConfirmButton: false,
            timer: 2500
          });
          eventNgForm.resetForm();
          this.files = [];
        },
        error => {
          console.log('Error:', error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong! Unable to upload image',
          });
        }
      );
    } catch (error) {
      console.error('Error converting file to base64:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong! Unable to convert image',
      });
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

  formatEnumName(name: string): string {
    const formatedName = name.toLowerCase().replaceAll('_', " ");
    return formatedName;
  }

}