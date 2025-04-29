import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-booking-form',
  imports: [ReactiveFormsModule],
  templateUrl: './booking-form.component.html',
  styleUrl: './booking-form.component.css'
})
export class BookingFormComponent {
  bookingForm:FormGroup;
  @Output() formSubmit = new EventEmitter<any>();

  constructor(private fb: FormBuilder){
    this.bookingForm =  this.fb.group({
      name: new FormControl(''),
      type: new FormControl(''),
      days: new FormControl(null),
      price: new FormControl(null),
      startDate: new FormControl(null)
    });
  
  }

  onSubmit() {
    if (this.bookingForm.valid) {
      return this.bookingForm.value; 
    }
  }



}
