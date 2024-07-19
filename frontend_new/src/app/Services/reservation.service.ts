import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Reservation } from "../Models/reservation";
import { AuthenticationService } from "./authentication.service";


@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  apiurl ="http://localhost:8084/";

  constructor(private httpClient: HttpClient, private authenticationService : AuthenticationService){
  }



  addReservation(reservation: Reservation) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'multipart/form-data');
    const user = this.authenticationService.getUserFromLocalCache();
    if (user !== null) {
      reservation.username=user.username;
    }
    console.log(reservation);
   return  this.httpClient.post(this.apiurl + 'reservation', reservation) ;

  }

  getAll(){
    return this.httpClient.get<Reservation[]>(this.apiurl+'reservation');
  }

  deleteReservation(id:any){
    console.log(id);
    return this.httpClient.delete<string[]>(this.apiurl+'reservation/'+id);

  }

}
