import { Component, effect, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Booking } from '../../models/booking';

@Component({
  selector: 'app-booking-form',
  imports: [ReactiveFormsModule],
  templateUrl: './booking-form.component.html',
  styleUrl: './booking-form.component.css'
})
export class BookingFormComponent {
  bookingForm:FormGroup;
  @Output() formSubmit = new EventEmitter<any>();

  
  constructor(private fb: FormBuilder, private route: ActivatedRoute){
    this.bookingForm =  this.fb.group({
      name: new FormControl(''),
      type: new FormControl(''),
      days: new FormControl(null),
      price: new FormControl(null),
      startDate: this.route.snapshot.queryParams['startDate']
    });
  }
  

  onSubmit() {
    if (this.bookingForm.valid) {
      return this.bookingForm.value; 
    }
  }
  setValue(value:Booking){
    this.bookingForm.setValue(value);
  }
  resetFrom(){
    this.bookingForm.patchValue({ startDate: '' });
  }

}
