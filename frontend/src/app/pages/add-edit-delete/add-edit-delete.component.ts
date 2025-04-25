import { Component, inject } from '@angular/core';
import { RouterLink} from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BookingsService } from '../../services/bookings.service';
import { Booking } from '../../models/booking';

@Component({
  selector: 'app-add-edit-delete',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './add-edit-delete.component.html',
  styleUrl: './add-edit-delete.component.css'
})
export class AddEditDeleteComponent {
  bookingForm:FormGroup;
  bookingService = inject(BookingsService);

  constructor(private fb: FormBuilder){
    this.bookingForm =  this.fb.group({
      name: new FormControl(''),
      type: new FormControl(''),
      days: new FormControl(null),
      price: new FormControl(null)
    });
  }

  addBooking() {
    const booking: Booking = {
      name: this.bookingForm.value.name,
      type: this.bookingForm.value.type,
      days: this.bookingForm.value.days,
      price: this.bookingForm.value.price
    }
    this.bookingService.addBooking(booking);
  }

  editBooking(id:number){
    this.bookingService.getBooking(id);
    console.log(this.bookingService.booking())
  }




}
