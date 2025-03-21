import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input() product: any;

  ngOnInit(): void {
    console.log(this.product);
  }


  imageChange(equipment: any, index: number) {
    equipment.url = equipment.product.files[index].file;
  }



}
