import { Component, OnInit } from '@angular/core';
import { CampPlaceFilterDto } from '../../../Models/campPlaceFilterDto';
import { CampPlaceService } from '../../../Services/camp-place.service';

@Component({
  selector: 'app-camp-place-list',
  templateUrl: './camp-place-list.component.html',
  styleUrls: ['./camp-place-list.component.css']
})
export class CampPlaceListComponent implements OnInit {

  campPlaces: any;
  campPlaceFilter = new CampPlaceFilterDto([], [], "name,asc", "");
  selectedOptions: { [id: number]: boolean } = {};
  categories: any;
  states: any;
  selectedStates: any;
  selectedCategories: any;



  pageSize = 6;
  p: number = 1;
  totalItems = 1;



  sortOptions = [
    { name: 'Alphabetical', value: 'name,asc', icon: "sort_by_alpha" },
    { name: 'Alphabetical', value: 'name,desc', icon: "sort_by_alpha" },
  ];
  constructor(private campPlaceService: CampPlaceService) {
  }



  ngOnInit(): void {
    this.campPlaceService.getCampPlaceCategories().subscribe(
      response => {
        this.categories = response
      },
      error => {
        console.log(error.message);
      }
    );
    this.campPlaceService.getState().subscribe(
      response => {
        this.states = response
      },
      error => {
        console.log(error.message);
      }
    );



    this.getFilteredCampPlaces();
  }




  getFilteredCampPlaces() {



    this.campPlaceService.getFilteredCamPlace(this.campPlaceFilter, this.p - 1, this.pageSize).subscribe(
      response => {
        console.log(response);



        this.campPlaces = response.content;
        this.totalItems = response.totalElements;
        console.log(response.totalElements);



      },
      error => {
        console.log("error" + error.message);
      }
    );

  }



  formatCategoryName(category: string): string {
    const formatedCategory = category.toLowerCase().replaceAll('_', " ");
    return formatedCategory;
  }



  toggleCategorySelection(category: any) {
    if (this.campPlaceFilter.categories) {
      const index = this.campPlaceFilter.categories.indexOf(category);
      if (index >= 0) {
        this.campPlaceFilter.categories.splice(index, 1); // Category is already selected, so remove it
      } else {
        this.campPlaceFilter.categories.push(category); // Category is not selected, so add it
      }
    }

    this.getFilteredCampPlaces();



  }



  toggleStateSelection(state: any) {
    if (this.campPlaceFilter.states) {
      const index = this.campPlaceFilter.states.indexOf(state);
      if (index >= 0) {
        this.campPlaceFilter.states.splice(index, 1);
      } else {
        this.campPlaceFilter.states.push(state);
      }
    }



    this.getFilteredCampPlaces();



  }



  onPageChange(event: any) {
    console.log(event);
    this.p = event;
    this.getFilteredCampPlaces();
  }



  clearFilter() {
    console.log("clean data");
    this.campPlaceFilter = new CampPlaceFilterDto([], [], "name,asc", "");
    this.p = 1;
    this.selectedCategories = [];
    this.selectedStates = [];
    this.getFilteredCampPlaces();
  }




  onReset() {
    this.campPlaceFilter.searchTerm = "";
    this.getFilteredCampPlaces();
  }



}
