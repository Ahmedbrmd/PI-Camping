import { Options } from '@angular-slider/ngx-slider';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';
import { EventFilterDto } from '../../../Models/dto/eventFilterDto';
import { EventService } from '../../../Services/event.service';

@Component({
  selector: 'app-event-table',
  templateUrl: './event-table.component.html',
  styleUrls: ['./event-table.component.css']
})
export class EventTableComponent implements OnInit{
  displayedColumns:string[]=['name','Category','description','StartDate','EndDate','nbParticipant','Price','edit',"remove","Edit"];

  @ViewChild(MatPaginator) paginator!:MatPaginator;


  events : any;
  eventFilter = new EventFilterDto([],0.0,500,new Date('2023-06-01'),new Date('2050-12-12'),"name,asc","");
  selectedOptions: { [id: number]: boolean } = {};
  categories :any;
  selectedCategories: any;
  eventList :Event[]=[];
  panelOpenState = false;
  /// slider variables
  options: Options = {
    floor: 0,
    ceil: 500,
    step:10
  };


  sortOptions = [
    {name: 'Alphabetical', value: 'name,asc',icon: "sort_by_alpha"},
    {name: 'Price: Low to high', value: 'price,asc' ,icon: "arrow_upward"},
    {name: 'Price: High to low', value: 'price,desc', icon:"arrow_downward"},
  ];

  constructor(private router: Router, private eventService :EventService) {}
  ngOnInit(): void {
    this.eventService.getAllEvent().subscribe((data)=>{
      this.eventList=data as Event[];
    })
    this.eventService.getEventCategories().subscribe(
      response =>{
        this.categories = response
      },
      error =>{
        console.log(error.message);
      }
    );

    this.getFilteredEvents();
  }


 getFilteredEvents(){

    this.eventService.getFilteredEvents(this.eventFilter,0, 100).subscribe(
      response =>{
        console.log(response);

        this.events = response.content;
        console.log("long====="+this.events.length);


      },
      error=>{
        console.log("error"+error.message);
      }
    )
  }

clearFilter(){
  console.log("clean data");
  this.eventFilter = new EventFilterDto([],0.0,500,new Date('2023-06-01'),new Date('2050-12-12'),"name,asc");
  this.selectedCategories= [];
  this.getFilteredEvents();
}


onReset(){
  this.eventFilter.searchTerm ="";
  this.getFilteredEvents();
}

selectSortOption(value : string){
  this.eventFilter.sort = value;
  this.getFilteredEvents();
}
  navigateToDetails(element: any) {
    // Assuming you have a details route defined in your routing configuration
    this.router.navigate(['/EventDetails/'+element.position]); // Replace 'details' with your actual details route path
  }
 /* deleteEvent(event: any) {
    console.log("Delete method called");
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
        this.eventService.deleteEvent(event.idEvent).subscribe({
          next: (response) => {
            Swal.fire(
              'Deleted!',
              `${event.name} has been deleted.`,
              'success'
            );
            this.getFilteredEvents(); 
          },
          error: (error) => {
            console.error('Error deleting event:', error);
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong! Unable to delete the event',
            });
          }
        });
      }
    });
  }*/
    deleteEvent(event: any) {
      console.log("Delete event method");
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
          this.eventService.deleteEvent(event.idEvent).subscribe({
            next: (response) => {
              Swal.fire(
                'Deleted!',
                `${event.name} has been deleted.`,
                'success'
              );
              this.getFilteredEvents(); 
            },
            error: (error) => {
              console.error('Error deleting event:', error);
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong! Unable to delete the event',
              });
            }
          });
        }
      });
    }



  
  formatCategoryName(category: string): string {
    const formatedCategory = category.toLowerCase().replaceAll('_'," ");
    return formatedCategory;
  }

}


