import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CampPlaceFilterDto } from '../../../Models/campPlaceFilterDto';
import { CampPlaceService } from '../../../Services/camp-place.service';
import { Options } from '@angular-slider/ngx-slider';
import { MatPaginator } from '@angular/material/paginator';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-camp-place-table',
  templateUrl: './camp-place-table.component.html',
  styleUrls: ['./camp-place-table.component.css']
})

export class CampPlaceTableComponent implements OnInit {

  displayedColumns: string[] = ['Id', 'name', 'Category', 'Description', 'Longitude', 'Latitude', 'Tel', 'Address', 'State', 'Email', 'edit'];




  @ViewChild(MatPaginator) paginator!: MatPaginator;





  campPlaces: any;

  campPlaceFilter = new CampPlaceFilterDto([], [], "name,asc", "");

  selectedOptions: { [id: number]: boolean } = {};

  categories: any;

  selectedCategories: any;

  panelOpenState = false;

  /// slider variables

  options: Options = {

    floor: 0,

    ceil: 500,

    step: 10

  };





  sortOptions = [

    { name: 'Alphabetical', value: 'name,asc', icon: "sort_by_alpha" },

    { name: 'Price: Low to high', value: 'price,asc', icon: "arrow_upward" },

    { name: 'Price: High to low', value: 'price,desc', icon: "arrow_downward" },

  ];




  constructor(private router: Router, private campPlaceService: CampPlaceService) { }

  ngOnInit(): void {

    this.campPlaceService.getCampPlaceCategories().subscribe(

      response => {

        this.categories = response

      },

      error => {

        console.log(error.message);

      }

    );




    this.getFilteredCampPlaces();

  }





  getFilteredCampPlaces() {




    this.campPlaceService.getFilteredCamPlace(this.campPlaceFilter, 0, 100).subscribe(

      response => {

        console.log(response);




        this.campPlaces = response.content;

        console.log("long=====" + this.campPlaces.length);





      },

      error => {

        console.log("error" + error.message);

      }

    )

  }







  clearFilter() {

    console.log("clean data");

    this.campPlaceFilter = new CampPlaceFilterDto([], [], "name,asc", "");

    this.selectedCategories = [];

    this.getFilteredCampPlaces();

  }





  onReset() {

    this.campPlaceFilter.searchTerm = "";

    this.getFilteredCampPlaces();

  }




  selectSortOption(value: string) {

    this.campPlaceFilter.sort = value;

    this.getFilteredCampPlaces();

  }

  navigateToDetails(element: any) {

    // Assuming you have a details route defined in your routing configuration

    this.router.navigate(['/CampPlaceDetails/' + element.position]); // Replace 'details' with your actual details route path

  }




  deleteCampPlace(campPlace: any) {

    console.log("delete method");

    Swal.fire({

      title: 'Are you sure?',

      text: "You won't be able to revert this!",

      icon: 'warning',

      showCancelButton: true,

      confirmButtonColor: '#3085d6',

      cancelButtonColor: '#d33',

      confirmButtonText: 'Yes, delete it!'

    }).then((result) => {

      if (result.isConfirmed) {




        this.campPlaceService.deleteCampPlace(campPlace.idCampPlace).subscribe(




          reponse => {

            Swal.fire(

              'Deleted!',

              campPlace.name + 'has been deleted.',

              'success'

            )

          },

          error => {

            console.log(error);

            Swal.fire({

              icon: 'error',

              title: 'Oops...',

              text: 'Something went wrong! Unable to delete the event',

            });

          }

        );

      }

    })


  }

  formatCategoryName(category: string): string {

    const formatedCategory = category.toLowerCase().replaceAll('_', " ");

    return formatedCategory;

  }




}
