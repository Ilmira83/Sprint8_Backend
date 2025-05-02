import { computed, inject, Injectable, Injector, signal } from "@angular/core";
import { HttpClient, httpResource } from '@angular/common/http';
import { environment } from "../environments/environments";
import { Booking } from "../models/booking";
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class BookingsService {

  private myAppUrl:string;
  private myApiUrl:string;
  private http = inject(HttpClient);

  bookingList = httpResource<Booking[]>(() => `${this.myAppUrl}${this.myApiUrl}`);


  constructor(){
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = environment.bookings;
  }

    
 /*  getListBookings(){ 
    return httpResource<Booking[]>(`${this.myAppUrl}${this.myApiUrl}`); */
      
  /*    return httpResource<Booking[]>(`${this.myAppUrl}${this.myApiUrl}`) */
    /*   return this.http.get<Booking[]>(`${this.myAppUrl}${this.myApiUrl}`) */
   /*  }  */

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
//убрать все subscribe в компоненты!!
//подумать - может не нужен отдельный add-edit-delete файл, может сделать через if открытие формы в Dashboard например...
//изменить название add-edit-delete и сделать это shared component
//разобраться почему даты на день позже выбираются
//обновить функцию Edit- сделано
//изменила в сервисе на toSignal 
//удалила ненужный сервис для передачи дат и сделала передачу через navigate queryParam из календаря в booking form
// ГЛОБАЛЬНО - все обновляется только через перегрузку страницы!!!!???


//2 html add and edit - в них форма и разные заголовки а также кнопки с разными подключенными функциями
//логика в сервисе, в дашборде и возможно в календаре...т.е. только в этих компонентах...??
}