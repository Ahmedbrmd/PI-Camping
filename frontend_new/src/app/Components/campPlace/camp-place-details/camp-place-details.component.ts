import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CampPlaceService } from '../../../Services/camp-place.service';
@Component({
  selector: 'app-camp-place-details',
  templateUrl: './camp-place-details.component.html',
  styleUrls: ['./camp-place-details.component.css']
})
export class CampPlaceDetailsComponent implements OnInit {
  campPlaces: any;
  constructor(private route: ActivatedRoute, private campPlaceService: CampPlaceService) { }
  campPlace: any;
  selectedCampImage: any;
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {

      const id = params.get('idCampPlace');
      this.campPlaceService.getCampPlaceById(id).subscribe(

        reponse => {

          this.campPlace = reponse
          this.selectedCampImage = this.campPlace.image;

          console.log(this.campPlace);
          this.campPlaceService.getCampPlaceByCategory(this.campPlace.category).subscribe(reponse => {

            this.campPlaces = reponse;
            console.log(this.campPlaces.length);

          },

            error => {

              console.log("error" + error);

            });
        },

        error => {

          console.log("error" + error.message);

        }

      );

    });




  }

  selectImage(image: string) {

    this.selectedCampImage = image;


  }



}
