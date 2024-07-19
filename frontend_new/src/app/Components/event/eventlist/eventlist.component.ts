import { Component, OnInit } from '@angular/core';
import { Options } from "@angular-slider/ngx-slider";
import { EventService } from '../../../Services/event.service';
import { EventFilterDto } from '../../../Models/dto/eventFilterDto';
import { Event } from '../../../Models/Event';

@Component({
  selector: 'app-event-list',
  templateUrl: './eventlist.component.html',
  styleUrls: ['./eventlist.component.css']
})
export class EventListComponent implements OnInit{
  events : any;
  eventFilter = new EventFilterDto([],0.0,500,new Date('2023-06-01'),new Date('2050-12-12'),"name,asc","");
  selectedOptions: { [id: number]: boolean } = {};
  categories :any;
  selectedCategories: any;
  eventList :Event[]=[]
  panelOpenState = false;
  /// slider variables
  options: Options = {
    floor: 0,
    ceil: 500,
    step:10
  };
  pageSize = 6;
  p: number = 1;
  totalItems = 1;

  sortOptions = [
    {name: 'Alphabetical', value: 'name,asc',icon: "sort_by_alpha"},
    {name: 'Price: Low to high', value: 'price,asc' ,icon: "arrow_upward"},
    {name: 'Price: High to low', value: 'price,desc', icon:"arrow_downward"},
  ];
  constructor(private eventServive : EventService){
  }

  ngOnInit(): void {
    this.eventServive.getEventCategories().subscribe(
      response =>{
        this.categories = response
      },
      error =>{
        console.log(error.message);
      }
    );

    this.getFilteredEvents();
    this.eventServive.getAllEvent().subscribe((data)=>{
      this.eventList=data as Event[];
    })
    
  }


  getFilteredEvents(){

    this.eventServive.getFilteredEvents(this.eventFilter,this.p-1, this.pageSize).subscribe(
      response =>{
        console.log(response);

        this.events = response.content;
        this.totalItems = response.totalElements;
        console.log(response.totalElements);

      },
      error=>{
        console.log("error"+error.message);
      }
    )
  }

  formatCategoryName(category: string): string {
    const formatedCategory = category.toLowerCase().replaceAll('_'," ");
    return formatedCategory;
  }

  toggleCategorySelection(category: any) {
    if(this.eventFilter.categories){
    const index = this.eventFilter.categories.indexOf(category);
    if (index >= 0) {
      this.eventFilter.categories.splice(index, 1); // Category is already selected, so remove it
    } else {
      this.eventFilter.categories.push(category); // Category is not selected, so add it
    }
  }
  console.log(this.eventFilter)
  this.getFilteredEvents();

}

onPageChange(event: any) {
  console.log(event);
  this.p = event;
  this.getFilteredEvents();
}

clearFilter(){
  console.log("clean data");
  this.eventFilter = new EventFilterDto([],0.0,500,new Date('2023-06-01'),new Date('2050-12-12'),"name,asc");
  this.p = 1;
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
}
