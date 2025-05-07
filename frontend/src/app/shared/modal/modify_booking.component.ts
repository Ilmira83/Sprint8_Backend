import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BookingsService } from '../../services/bookingsAPI.service';
import { Booking } from '../../models/booking';
import { BookingFormComponent } from "../booking-form/booking-form.component";

@Component({
  selector: 'modify_booking',
  imports: [ ReactiveFormsModule, BookingFormComponent],
  templateUrl: './modify_booking.component.html',
  styleUrl: './modify_booking.component.css'
})


export class Modify_bookingComponent {

  @ViewChild(BookingFormComponent) bookingForm!: BookingFormComponent;
  bookingService = inject(BookingsService);
  bookingList = this.bookingService.bookingList;
  currentdID = this.bookingService.currentID;
  @ViewChild('myModal') myModal:ElementRef | undefined;


  addBooking() {
    const bookingData = this.bookingForm.onSubmit();
    if(!bookingData) return;
    const booking: Booking = {
      name: bookingData.name,
      type: bookingData.type,
      days: bookingData.days,
      price: bookingData.price,
      startDate: bookingData.startDate,
    };
    this.bookingService.addBooking(booking).subscribe({
      next: () => {
        this.bookingList.reload();
        this.closeModal();
       this.bookingForm.resetForm()
      }
    }); 
  }

  updateBooking(){
    const bookingData = this.bookingForm.onSubmit();
    const booking: Booking = {
      name: bookingData.name,
      type: bookingData.type,
      days: bookingData.days,
      price: bookingData.price,
      startDate: bookingData.startDate,
    }
    this.bookingService.updateBooking(this.currentdID()!, booking).subscribe({
      next: () => {
        this.bookingList.reload();
        this.closeModal();
        this.currentdID.set(0);
        this.bookingForm.resetForm()
      }
    });
  }

  openModal() {
    if(this.myModal) {
      this.myModal.nativeElement.style.display = 'block'
    }
    
  }
  closeModal(){
    if(this.myModal) {
      this.myModal.nativeElement.style.display = 'none'
    }
    this.bookingForm.resetForm()
  }
      

   
  






}
