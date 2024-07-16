import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { productservice } from '../../../Services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  products: any;
  equipements: any;
  equipement: any;
  testEquipement = {
    product: {
      idProduct: 0, name: "Automatic Tent For Beach And Camping", description: "Automatic tent for beach and camping 8 places 250*250*165 cm This pop-up beach tent opens automatically in seconds, no assembly required. very easy to fold up into a small round shape and put in the carry bag.",
      state: "new", price: 250, category: "ESCALADE", files: [{ id: 0, file: "https://tn.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/68/1271/1.jpg?4466" },
      { id: 1, file: "https://contents.mediadecathlon.com/p1259581/k$47977d533ae46915ab592bab64ec7153/tente-de-camping-2-seconds-verte-3-personnes.jpg?format=auto&quality=60&f=452x452" },
      { id: 2, file: "https://www.lidl.fr/assets/gcpc6867a05209246f2bd0ab39f90668e7e.jpeg" }]
    }, url: "https://www.lidl.fr/assets/gcpc6867a05209246f2bd0ab39f90668e7e.jpeg", available: true, size: 10, weight: 5
  };
  e: any;

  constructor(private productservice: productservice, private route: ActivatedRoute) {

  }
  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      const id = params.get('idProduct');

      this.productservice.getProductById(id).subscribe(
        reponse => {

          this.equipement = { product: reponse, url: reponse.image };
          console.log(this.equipement.product.available);

          this.productservice.getSimilairProducts(this.equipement.product.category).subscribe(reponse => {

            this.products = reponse;
          },
            error => {
              console.log("error" + error.message);
            })
        },
        error => {
          console.log("error" + error.message);
        }
      );

    });

  }


  imageChange(equipment: any, index: number) {
    equipment.url = equipment.product.files[index].file;
  }

}









