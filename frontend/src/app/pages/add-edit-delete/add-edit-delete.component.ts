import { Component, inject, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterLink} from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { BookingsService } from '../../services/bookings.service';
import { Booking } from '../../models/booking';
import { BookingFormComponent } from "../../shared/booking-form/booking-form.component";

@Component({
  selector: 'app-add-edit-delete',
  imports: [RouterLink, ReactiveFormsModule, BookingFormComponent],
  templateUrl: './add-edit-delete.component.html',
  styleUrl: './add-edit-delete.component.css'
})
export class AddEditDeleteComponent {
  @ViewChild(BookingFormComponent) bookingForm!: BookingFormComponent;
  bookingService = inject(BookingsService);
  booking = this.bookingService.booking;
  aRouter = inject(ActivatedRoute);
  operation:string = 'Add '
  id:number;
  router = inject(Router)

  constructor(){
   this.id = Number(this.aRouter.snapshot.paramMap.get('id'));
  }

  addBooking() {
    const bookingData = this.bookingForm.onSubmit();
    const booking: Booking = {
      name: bookingData.name,
      type: bookingData.type,
      days: bookingData.days,
      price: bookingData.price,
      startDate: bookingData.startDate,
    }
    this.bookingService.addBooking(booking);
    this.router.navigate(['/app-dashboard'])    
  }

  ngOnInit():void {
    if(this.id != 0) {
      this.operation = 'Edit ';
      this.getBooking(this.id)
    }
    
  
  }

  getBooking(id:number){
   /*  this.bookingService.getBooking(id).subscribe(response =>
      this.bookingForm.setValue({
      name:response.name,
      type:response.type,
      days:response.days,
      price:response.price,
      startDate:response.startDate
     })
    ); */
  }
  updateBooking(){
   /*  this.booking.set({
      name: this.bookingForm.value.name,
      type: this.bookingForm.value.type,
      days: this.bookingForm.value.days,
      price: this.bookingForm.value.price,
      startDate: this.bookingForm.value.startDate
    })
    this.bookingService.updateBooking(this.id, this.booking()!); */
  }






}
