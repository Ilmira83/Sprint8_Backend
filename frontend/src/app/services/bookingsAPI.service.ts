import { inject, Injectable, signal } from "@angular/core";
import { HttpClient, httpResource } from '@angular/common/http';
import { environment } from "../environments/environments";
import { Booking } from "../models/booking";


@Injectable({
  providedIn: 'root'
})

export class BookingsService {

  private myAppUrl:string;
  private myApiUrl:string;
  private http = inject(HttpClient);
  currentID = signal<number>(0);

 
  constructor(){
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = environment.bookings;
  }

  bookingList = httpResource<Booking[]>(() => `${this.myAppUrl}${this.myApiUrl}`);

  deleteBooking(id:number){
    return this.http.delete(`${this.myAppUrl}${this.myApiUrl}${id}`)
  }

  addBooking(booking:Booking){
   return this.http.post<Booking>(`${this.myAppUrl}${this.myApiUrl}`, booking)
  }
  getBooking(id:number){
    return this.http.get<Booking>(`${this.myAppUrl}${this.myApiUrl}${id}`)
  }
  updateBooking(id:number, booking:Booking){
    return this.http.put(`${this.myAppUrl}${this.myApiUrl}${id}`, booking)
  }

//сделать Layout

}