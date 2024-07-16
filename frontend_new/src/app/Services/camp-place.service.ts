import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CampPlace } from '../Models/campPlace.model';
import { CampPlaceFilterDto } from '../Models/campPlaceFilterDto';
import { Page } from '../Models/page';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CampPlaceService {

  apiurl = "http://localhost:8084/camping/";

  constructor(private httpClient: HttpClient) {

  }





  getAllCampPlace() {
    return this.httpClient.get<CampPlace[]>(this.apiurl + 'campPlace');
  }
  // for home screen
  getTop5CampPlace() {
    return this.httpClient.get<CampPlace[]>(this.apiurl + 'campPlace/getTop5CampPlace');
  }
  getCampPlaceCount() {
    return this.httpClient.get<number>(this.apiurl + 'campPlace/campPlacesCount');
  }

  getCampPlaceCategories() {
    return this.httpClient.get<string[]>(this.apiurl + 'campPlace/categories');

  }
  getState() {
    return this.httpClient.get<string[]>(this.apiurl + 'campPlace/state');

  }

  addCampPlace(campPlace: CampPlace): Observable<any> {
    return this.httpClient.post(this.apiurl + 'campPlace', campPlace);
  }

  convertFileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  }




  getFilteredCamPlace(campPlaceFilterDto: CampPlaceFilterDto, page: number, size: number): Observable<Page<CampPlace>> {

    let params = new HttpParams();

    if (campPlaceFilterDto.categories && campPlaceFilterDto.categories.length > 0) {

      params = params.append('categories', campPlaceFilterDto.categories.toString());

    } if (campPlaceFilterDto.states && campPlaceFilterDto.states.length > 0) {

      params = params.append('states', campPlaceFilterDto.states.toString());

    }

    params = params.append('page', page.toString());

    params = params.append('size', size.toString());

    params = params.append('sort', campPlaceFilterDto.sort);

    params = params.append('search', campPlaceFilterDto.searchTerm);




    return this.httpClient.get<Page<CampPlace>>(this.apiurl + 'campPlace/filteredCampPlaces', { params });

  }
  getCampPlaceByCategory(category: any) {
    return this.httpClient.get<CampPlace>(this.apiurl + 'campPlace/getSimilaireCampPlace/' + category);
  }
  getCampPlaceById(idCampPlace: any) {
    return this.httpClient.get<CampPlace>(this.apiurl + 'campPlace/' + idCampPlace);
  }

  deleteCampPlace(id: any) {

    return this.httpClient.delete<string[]>(this.apiurl + 'campPlace/' + id);
  }
  // updateCampPlace(campPlace: CampPlace, file: File[]) {
  //   let headers = new HttpHeaders();
  //   headers = headers.set('Content-Type', 'multipart/form-data');

  //   return this.httpClient.put(this.apiurl + 'campPlace', this.convertCampPlaceToFormData(campPlace, file));
  // }

  getCampPlacesSelect() {
    return this.httpClient.get<{ idCampPlace: any, name: any }>(this.apiurl + 'campPlace/getCampPlaceForSelect');
  }
}
