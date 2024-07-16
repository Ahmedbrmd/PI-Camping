import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Product } from "../Models/product";
import { ProductFilterDto } from "../Models/productFilterDto";
import { Observable } from "rxjs";
import { Page } from "../Models/page";

@Injectable({
  providedIn: 'root'
})
export class productservice {

  apiurl = "http://localhost:8084/camping/";


  constructor(private httpClient: HttpClient) {

  }



  updateProduct(product: Product, files: File[]) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'multipart/form-data');

    return this.httpClient.put(this.apiurl + 'products/addProduct', this.convertProductToFormData(product, files));

  }
  addProduct(product: Product): Observable<any> {
    return this.httpClient.post(this.apiurl + 'products/addProduct', product);
  }
  convertFileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  }
  convertProductToFormData(product: Product, files: File[]): any {
    const formData = new FormData();
    formData.append('idProduct', product.id);
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('size', product.size.toString());
    formData.append('weight', product.weight.toString());
    formData.append('color', product.color);
    formData.append('category', product.category.toString());
    formData.append('price', product.price.toString());
    formData.append('available', product.available.toString());

    formData.append('state', product.state.toString());
    for (let i = 0; i < files.length; i++) {
      formData.append('files[' + i + ']', files[i], files[i].name);

    }
    return formData;
  }
  getFilteredProducts(productFilterDto: ProductFilterDto, page: number, size: number): Observable<Page<Product>> {
    let params = new HttpParams();
    if (productFilterDto.categories && productFilterDto.categories.length > 0) {
      params = params.append('categories', productFilterDto.categories.toString());
    }
    params = params.append('minPrice', productFilterDto.minPrice.toString());
    params = params.append('page', page.toString());
    params = params.append('size', size.toString());
    params = params.append('sort', productFilterDto.sort);
    params = params.append('search', productFilterDto.searchTerm);

    return this.httpClient.get<Page<Product>>(this.apiurl + 'products/filteredProducts', { params });
  }
  getProductCategories() {
    return this.httpClient.get<string[]>(this.apiurl + 'products/categories');

  }
  getSimilairProducts(category: any) {
    return this.httpClient.get<string[]>(this.apiurl + 'products/getSimilaireProduct/' + category);

  }

  getAllProduct() {
    return this.httpClient.get<Product[]>(this.apiurl + 'products');
  }
  getProductCount() {
    return this.httpClient.get<number>(this.apiurl + 'products/productCount');
  }

  getProductById(id: any) {
    return this.httpClient.get<Product>(this.apiurl + 'products/' + id);
  }


  //for home screen
  getNewestProducts() {
    return this.httpClient.get<Product[]>(this.apiurl + 'products/getNewestProduct');
  }

  deleteProduct(id: any) {

    return this.httpClient.delete<string[]>(this.apiurl + 'products/' + id);




  }


}
