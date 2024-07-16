import { Options } from '@angular-slider/ngx-slider';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ProductFilterDto } from '../../../Models/productFilterDto';
import { productservice } from '../../../Services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.css']
})
export class ProductTableComponent implements OnInit {
  displayedColumns: string[] = ['Id', 'name', 'Category', 'Description', 'Price', 'edit'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;


  products: any;
  productFilter = new ProductFilterDto([], 0.0, 500, "name,asc", "");
  selectedOptions: { [id: number]: boolean } = {};
  categories: any;
  selectedCategories: any;
  panelOpenState = false;



  sortOptions = [
    { name: 'Alphabetical', value: 'name,asc', icon: "sort_by_alpha" },
    { name: 'Price: Low to high', value: 'price,asc', icon: "arrow_upward" },
    { name: 'Price: High to low', value: 'price,desc', icon: "arrow_downward" },
  ];

  constructor(private router: Router, private productservice: productservice) { }
  ngOnInit(): void {
    this.productservice.getProductCategories().subscribe(
      response => {
        this.categories = response
      },
      error => {
        console.log(error.message);
      }
    );

    this.getFilteredProducts();
  }


  getFilteredProducts() {

    this.productservice.getFilteredProducts(this.productFilter, 0, 100).subscribe(
      response => {
        console.log(response);

        this.products = response.content;
        console.log(response.totalElements);

      },
      error => {
        console.log("error" + error.message);
      }
    )
  }




  clearFilter() {
    console.log("clean data");
    this.productFilter = new ProductFilterDto([], 0.0, 500, "name,asc");
    this.selectedCategories = [];
    this.getFilteredProducts();
  }


  onReset() {
    this.productFilter.searchTerm = "";
    this.getFilteredProducts();
  }

  selectSortOption(value: string) {
    this.productFilter.sort = value;
    this.getFilteredProducts();
  }
  navigateToDetails(element: any) {
    // Assuming you have a details route defined in your routing configuration
    this.router.navigate(['/ProductDetails/' + element.position]); // Replace 'details' with your actual details route path
  }

  deleteProduct(product: any) {
    console.log("delete method");
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.productservice.deleteProduct(product.idProduct).subscribe(

          reponse => {
            Swal.fire(
              'Deleted!',
              product.name + 'has been deleted.',
              'success'
            )
          },
          error => {
            console.log(error);
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong! Unable to delete the product',
            });
          }


        );

      }
    })




  }

}
