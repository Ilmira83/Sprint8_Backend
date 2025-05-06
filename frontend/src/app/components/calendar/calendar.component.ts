import { Component, computed, effect, ElementRef, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterOutlet} from '@angular/router';
import { FullCalendarModule } from '@fullcalendar/angular'
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { BookingsService } from '../../services/bookingsAPI.service';
import { Modify_bookingComponent } from '../../shared/modal/modify_booking.component';
import { Booking } from '../../models/booking';


interface Event {
  id?: string,
  title: string,
  date: string,
}
@Component({
  selector: 'app-calendar',
  imports: [CommonModule, FullCalendarModule, RouterOutlet, Modify_bookingComponent],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})


export class CalendarComponent {
  @ViewChild(Modify_bookingComponent)
  myModal!: Modify_bookingComponent;
  @ViewChild('eventModal', { static: false }) eventModal!: ElementRef<HTMLDivElement>;
  bookingsService = inject(BookingsService);
  currentID = this.bookingsService.currentID;
  
  /* eventsList: Event[] = []; */
  router = inject(Router);
  route = inject(ActivatedRoute);
  modalOpen:boolean = false;
  clickEvent:boolean = true;

  /* bookingList = this.bookingsService.bookingList; */
  bookingList = computed(() => this.bookingsService.bookingList.value() ?? [] as Booking[]);
  eventsList = computed(() => (this.bookingList().map(booking => ({
    id: booking.id!.toString(),
    title: booking.name,
    date: booking.startDate,   
  }))))

  constructor(){
    /* effect(()=>{
      if(this.bookingList())
        this.eventsList = this.bookingList().map(booking => ({
        id: booking.id!.toString(),
        title: booking.name,
        date: booking.startDate,   
      }))
    }) */
  }
 
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    dateClick: (arg) => this.handleDateClick(arg),
    editable: true,
    events: [],
    eventDidMount: (info) => {
      info.el.style.cursor = 'pointer';
    },
    contentHeight: 'auto',
    eventClick: (info) =>{
      this.currentID.set(Number(info.event.id));
      console.log(this.currentID())
      this.openEventModal();
    },
  };

  handleDateClick(arg: DateClickArg) {
    const date = arg.date.toLocaleDateString('sv-SE').split('T')[0];
    this.modalOpen = true;
    if(this.myModal){
      this.myModal.openModal();
    }
    setTimeout(() => {
      this.myModal.bookingForm.patchValue({ startDate: date });
    });
  }

  editBooking(){
    this.clickEvent = false;
    this.modalOpen = true;
    if(this.myModal){
      this.myModal.openModal();
    }
      this.bookingsService.getBooking(this.currentID()).subscribe(response =>
        this.myModal.bookingForm.setValue({
          name:response.name,
          type:response.type,
          days:response.days,
          price:response.price,
          startDate:response.startDate
        }));
    this.bookingsService.bookingList.reload();
  }

  openEventModal(){
    this.clickEvent = true;
    setTimeout(() => {
      if (this.eventModal?.nativeElement) {
        this.eventModal.nativeElement.style.display = 'block';
      } else {
        console.error('Event modal element not found');
      }
    });
  }

  closeEventModal(){
    if(this.eventModal) {
      this.eventModal.nativeElement.style.display = 'none'
    };
    if(this.myModal){
      this.myModal.bookingForm.resetForm()
    }
    this.clickEvent = false;
    this.currentID.set(0);
  }

  deleteBooking(){
    this.bookingsService.deleteBooking(this.currentID()).subscribe(()=>{
      this.bookingsService.bookingList.reload();
      this.closeEventModal()
    });
  }

}
