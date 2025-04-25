import { inject, Injectable, signal } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environment } from "../environments/environments";
import { Booking } from "../models/booking";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})

export class BookingsService {

  private myAppUrl:string;
  private myApiUrl:string;
  private http = inject(HttpClient);
  bookingList = signal<Booking[] | undefined>([]);
  booking = signal<Booking | undefined>(undefined);
  router = inject(Router)

  constructor(){
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = environment.bookings;
  }

  getListBookings(){
    this.http.get<Booking[]>(`${this.myAppUrl}${this.myApiUrl}`).subscribe(response => 
    this.bookingList.set(response))
  }
  deleteBooking(id:number){
    this.http.delete(`${this.myAppUrl}${this.myApiUrl}${id}`).subscribe(() => 
    this.getListBookings());
  }

  addBooking(booking:Booking){
    this.http.post(`${this.myAppUrl}${this.myApiUrl}`, booking).subscribe(()=>{this.getListBookings();
      this.router.navigate(['/app-dashboard'])
    })
  }
  getBooking(id:number){
    return this.http.get<Booking>(`${this.myAppUrl}${this.myApiUrl}${id}`)
  }
  updateBooking(id:number, booking:Booking){
    this.http.put(`${this.myAppUrl}${this.myApiUrl}${id}`, booking).subscribe(()=> {this.getListBookings();
      this.router.navigate(['/app-dashboard'])
    })
  }



}