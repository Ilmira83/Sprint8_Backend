import { Component, computed, effect, inject, OnInit, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingsService } from '../../services/bookingsAPI.service';
import { Modify_bookingComponent } from '../../shared/modal/modify_booking.component';
import { BookingFormComponent } from '../../shared/booking-form/booking-form.component';
import { Booking } from '../../models/booking';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, Modify_bookingComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  
 @ViewChild(BookingFormComponent) bookingForm!: BookingFormComponent;
  bookingsService = inject(BookingsService);
  @ViewChild(Modify_bookingComponent) myModal!: Modify_bookingComponent;
  modalOpen:boolean = false;
  currentID = this.bookingsService.currentID;
  
  bookingList = computed(() => this.bookingsService.bookingList.value() ?? [] as Booking[]);

  openModal(){
    this.modalOpen = true;
    if(this.myModal){
      this.myModal.openModal();
    }
  }

  getBooking(id:number){
    this.currentID.set(id);
    this.bookingsService.getBooking(id).subscribe(response =>
      this.myModal.bookingForm.setValue({
      name:response.name,
      type:response.type,
      days:response.days,
      price:response.price,
      startDate:response.startDate
     })
    );
    this.openModal();
  }

  deleteBooking(id:number){
   this.bookingsService.deleteBooking(id).subscribe(() =>
    this.bookingsService.bookingList.reload()
   );
   
  }



}
