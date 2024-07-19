import { Component, Directive, ElementRef, HostListener, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { CampPlaceService } from '../../Services/camp-place.service';
// import { EventService } from 'app/Services/event.service';
// import { productservice } from 'app/Services/product.service';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  events: any;
  public imageData: any;
  reader: FileReader = new FileReader();

  campPlaces: any;
  products: any;
  productsCount: any;
  eventsCount: any;
  campPlacesCount: any;
  // camp place a supprime
  imageList: string[] = [
    'assets/zaghouan.jpg',
    'assets/bg.png',
    'assets/bg3.jpg',
    'assets/tbarka.jpg',
    // Add more images to the list
  ];
  selectedCampImage = 'assets/zaghouan.jpg';




  constructor(
    // private eventServive : EventService,
    private campPlaceService: CampPlaceService
    // ,private productService: productservice
  ) {

  }
  ngOnInit(): void {

    // this.eventServive.getEventsCount().subscribe(
    //   reponse =>{
    //     this.eventsCount=reponse;
    //   },
    //   error=>{
    //     console.log("error"+error);
    //   }
    // );
    // this.productService.getProductCount().subscribe(
    //   reponse =>{
    //     this.productsCount = reponse
    //   },
    //   error=>{
    //     console.log("error"+error);
    //   }
    // );

    this.campPlaceService.getCampPlaceCount().subscribe(
      reponse => {
        this.campPlacesCount = reponse;
      },
      error => {
        console.log("error" + error);
      }
    );

    this.campPlaceService.getAllCampPlace().subscribe(
      reponse => {
        console.log(reponse);

        this.campPlaces = reponse;
        console.log(this.campPlaces[0].name);
      },
      error => {
        console.log("error" + error);
      }
    );

    // this.productService.getNewestProducts().subscribe(
    //   reponse =>{
    //     console.log(reponse);

    //     this.products = reponse;
    //   },
    //   error=>{
    //     console.log("error"+error);
    //   }
    // );
    // this.eventServive.getAllEvent().subscribe(
    //   reponse =>{
    //     console.log(reponse);

    //     this.events = reponse;
    //   },
    //   error=>{
    //     console.log("error"+error);
    //   }
    // )
  }

  partnerLogos: string[] = [
    'assets/partner/ctrip.png',
    'assets/partner/traveltodo.png',
    'assets/partner/tui.png',
    'assets/partner/diammant.png',
    'assets/partner/voyage.png',
    'assets/partner/itaka.png',
    'assets/partner/paximum.png',
    'assets/partner/clickNgo.png'
  ];

  PartnersOptions: OwlOptions = {
    items: this.partnerLogos.length,
    loop: true,
    autoplay: true,
    autoplayTimeout: 2000,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 5
      }
    },
    nav: false
  }
  eventOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['<i class="bi bi-caret-left-fill"></i>', '<i class="bi bi-caret-right-fill"></i>'],
    responsive: {
      0: {
        items: 1
      },
      500: {
        items: 2
      },
      740: {
        items: 2
      },
      940: {
        items: 3
      }
    },
    nav: true
  }
  imageChange(equipment: Equipement, index: number) {
    equipment.url = equipment.images[index];
  }

  selectImage(image: string) {
    this.selectedCampImage = image;
  }
}

export class Equipement {
  constructor(public name: string, public description: string, public state: string, public price: number,
    public category: string, public url: string, public images: string[]) {

  }





}
