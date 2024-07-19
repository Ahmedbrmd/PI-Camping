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









