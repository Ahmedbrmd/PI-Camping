import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../Models/product';
import { productservice } from '../../../Services/product.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  files: File[] = [];
  selectedCategory: any;
  product: Product = {
    id: '',
    name: '',
    description: '',
    available: false,
    price: 0,
    state: '',
    category: 'ESCALADE',
    size: 0,
    weight: 0,
    color: '',
    image: ''
  };

  categories: string[] = [];

  constructor(private productService: productservice, private route: ActivatedRoute) {

  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.product.id = params.get('idProduct');
    });
    this.productService.getProductCategories().subscribe(
      response => {

        this.categories = response
      },
      error => {
        console.log(error);
      }
    )
  }


  async upsertProduct(eventNgForm: NgForm) {
    if (eventNgForm.valid == false || this.files.length < 1) {
      console.log(eventNgForm.errors);
      return;
    }
    try {
      const base64String = await this.productService.convertFileToBase64(this.files[0]);
      this.product.image = base64String.split(',')[1];  // Extract the base64 string part

      this.productService.addProduct(this.product).subscribe(
        response => {
          console.log('Product added successfully');
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your product has been saved',
            showConfirmButton: false,
            timer: 2500
          });
          eventNgForm.resetForm();
          this.files = [];
        },
        error => {
          console.log('Error:', error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong! Unable to upload image',
          });
        }
      );
    } catch (error) {
      console.error('Error converting file to base64:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong! Unable to convert image',
      });
    }
  }

  // }





  onSelect(product: any) {
    console.log(product);
    this.files.push(...product.addedFiles);
  }

  onRemove(product: any) {
    console.log(product);
    this.files.splice(this.files.indexOf(product), 1);
  }

  formatCategoryName(category: string): string {
    const formatedCategory = category.toLowerCase().replaceAll('_', " ");
    return formatedCategory;
  }

}


