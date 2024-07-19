import { Component, OnInit } from '@angular/core';
import { EventService } from '../../../Services/event.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {
  event:any;
  relevantEvents :any;
  images : string[]=[
    "assets/zaghouan.jpg",
    "assets/bg3.jpg",
    "assets/tbarka.jpg",
    "assets/camp2.jpg"
  ];
  features : Feature[]=[]
 

  constructor(private eventService: EventService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('idEvent');
      this.eventService.getEventById(id).subscribe(
        reponse =>{
          console.log(reponse);

         this.event = reponse;
        },
        error=>{
          console.log("error "+error.message);
        }
      );
      this.eventService.getRelevantEvent(this.event.category).subscribe(
        reponse =>{
          console.log(reponse);

         this.relevantEvents = reponse;
        },
        error=>{
          console.log("error "+error.message);
        }
      );
    });


  }
  formatCategoryName(category: string): string {
    const formatedCategory = category.toLowerCase().replaceAll('_'," ");
    return formatedCategory;
  }

}

class Feature{
  constructor(public type :string, public description: string , public icon :string){

  }

}
