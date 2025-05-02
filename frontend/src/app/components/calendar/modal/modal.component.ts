import { Component, inject, ViewChild } from '@angular/core';
import { Router, RouterLink, RouterLinkActive} from '@angular/router';
import { BookingsService } from '../../../services/bookingsAPI.service';
import { BookingFormComponent } from "../../../shared/booking-form/booking-form.component";
import { Booking } from '../../../models/booking';

@Component({
  selector: 'app-modal',
  imports: [RouterLink, RouterLinkActive, BookingFormComponent],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  bookingsService = inject(BookingsService);
  bookingList = this.bookingsService.bookingList;
  @ViewChild(BookingFormComponent) bookingForm!: BookingFormComponent;
  router = inject(Router)

    addBooking() {
      const bookingData = this.bookingForm.onSubmit();
      const booking: Booking = {
        name: bookingData.name,
        type: bookingData.type,
        days: bookingData.days,
        price: bookingData.price,
        startDate: bookingData.startDate,
      }
      this.bookingsService.addBooking(booking).subscribe({
        next: () => {
          this.bookingList.reload();  
          this.router.navigate(['/app-calendar']);
          this.bookingForm.resetFrom();
        }
      });
    }

    deleteBooking(id:number){
      this.bookingsService.deleteBooking(id).subscribe();
      this.bookingList.reload() // this is the method!!!
     }




   
      
  }







