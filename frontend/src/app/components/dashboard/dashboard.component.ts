import { Component, computed, effect, inject, Injector, OnInit, signal } from '@angular/core';
import { RouterLink, RouterLinkActive} from '@angular/router';
import { CommonModule } from '@angular/common';
import { BookingsService } from '../../services/bookingsAPI.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Booking } from '../../models/booking';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  private injector = inject(Injector);
  bookingsService = inject(BookingsService);

  bookingList = this.bookingsService.bookingList;


  deleteBooking(id:number){
   this.bookingsService.deleteBooking(id).subscribe()
   this.bookingList.reload() // this is the method!!!
  }


}
