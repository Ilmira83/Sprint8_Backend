import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink} from '@angular/router';
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
  booking = this.bookingService.booking;
  aRouter = inject(ActivatedRoute);
  operation:string = 'Add '
  id:number;

  constructor(private fb: FormBuilder){
    this.bookingForm =  this.fb.group({
      name: new FormControl(''),
      type: new FormControl(''),
      days: new FormControl(null),
      price: new FormControl(null)
    });
    this.id = Number(this.aRouter.snapshot.paramMap.get('id'));
  }

  addBooking() {
    const booking: Booking = {
      name: this.bookingForm.value.name,
      type: this.bookingForm.value.type,
      days: this.bookingForm.value.days,
      price: this.bookingForm.value.price,
    }
    this.bookingService.addBooking(booking);
  }

  ngOnInit():void {
    if(this.id != 0) {
      this.operation = 'Edit '
    }
    this.getBooking(this.id)
  
  }

  getBooking(id:number){
    this.bookingService.getBooking(id).subscribe(response =>
      this.bookingForm.setValue({
      name:response.name,
      type:response.type,
      days:response.days,
      price:response.price
    })
    );
  }
  updateBooking(){
    this.booking.set({
      name: this.bookingForm.value.name,
      type: this.bookingForm.value.type,
      days: this.bookingForm.value.days,
      price: this.bookingForm.value.price,
    })
    this.bookingService.updateBooking(this.id, this.booking()!);
  }






}
