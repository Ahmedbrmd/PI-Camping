import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-camp-place-card',
  templateUrl: './camp-place-card.component.html',
  styleUrls: ['./camp-place-card.component.css']
})


export class CampPlaceCardComponent implements OnInit {
  @Input() campPlace: any;
  constructor(private router: Router) { }
  ngOnInit(): void {

    console.log("campplace:", this.campPlace);
  }
  navigateToDetails(campPlace: any) {
    this.router.navigate(['/CampPlaceDetails'],
      { state: { data: campPlace } });
    console.log("verification")
  }

}
