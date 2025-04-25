import { inject, Injectable, signal } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environment } from "../environments/environments";
import { Booking } from "../models/booking";

@Injectable({
  providedIn: 'root'
})

export class BookingsService {

  private myAppUrl:string;
  private myApiUrl:string;
  private http = inject(HttpClient);
  bookingList = signal<Booking[] | undefined>(undefined)

  constructor(){
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = environment.bookings;
  }

  getListBookings(){
    this.http.get<Booking[]>(`${this.myAppUrl}${this.myApiUrl}`).subscribe(response => 
      this.bookingList.update(v=> [...v??[], ...response]))
      console.log(this.bookingList())
  }

}