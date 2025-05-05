import { Component, effect, ElementRef, inject, input, OnInit, signal, ViewChild } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { BookingsService } from '../../services/bookingsAPI.service';
import { Booking } from '../../models/booking';
import { BookingFormComponent } from "../../shared/booking-form/booking-form.component";

@Component({
  selector: 'modify_booking',
  imports: [ ReactiveFormsModule, BookingFormComponent],
  templateUrl: './modify_booking.component.html',
  styleUrl: './modify_booking.component.css'
})
export class Modify_bookingComponent implements OnInit {
  @ViewChild(BookingFormComponent) bookingForm!: BookingFormComponent;
  bookingService = inject(BookingsService);
  bookingList = this.bookingService.bookingList;
  aRouter = inject(ActivatedRoute);
  operation:string = 'Add '
  currentdID = input<number>(0);
  router = inject(Router);
  @ViewChild('myModal') myModal:ElementRef | undefined;

  constructor() {
    effect(()=> {
      if(this.currentdID() != 0) {
        console.log(this.currentdID())
        this.operation = 'Edit ';
      };
    })
  }

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
        this.closeModal()
      }
    });
  }

  ngOnInit(): void {
    if(this.currentdID() != 0) {
      console.log(this.currentdID())
      this.operation = 'Edit ';
    };
  }
/*   getBooking(id:number){
    this.bookingService.getBooking(id).subscribe(response =>
      this.bookingForm.setValue({
      name:response.name,
      type:response.type,
      days:response.days,
      price:response.price,
      startDate:response.startDate
     })
    );
  } */

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
  }
      

   
  






}
