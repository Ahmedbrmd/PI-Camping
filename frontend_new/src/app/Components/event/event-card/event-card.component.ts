import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.css']
})
export class EventCardComponent {


  @Input() event: any;
  @Input() isHomeComponent?: boolean;


  constructor(private datePipe: DatePipe) { }

  getFormatedDay(dateString: string): string {
    const date = new Date(dateString);
    const formattedDate = this.datePipe.transform(date, 'dd');
    return formattedDate || '';
  }
  getFormatedMonth(dateString: string): string {
    const date = new Date(dateString);
    const formattedDate = this.datePipe.transform(date, 'MMM');
    return formattedDate || '';
  }
}
