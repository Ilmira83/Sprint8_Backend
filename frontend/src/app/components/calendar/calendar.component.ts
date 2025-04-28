import { Component, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular'
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { BookingsService } from '../../services/bookings.service';


interface Event {
  title: string,
  date: string,
}
@Component({
  selector: 'app-calendar',
  imports: [CommonModule, FullCalendarModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})


export class CalendarComponent {

  bookingsService = inject(BookingsService);
  bookingList = this.bookingsService.bookingList;
  eventsList: Event[] = [];

  ngOnInit(): void {
    this.bookingsService.getListBookings();
    console.log(this.bookingList())
  }
  constructor(){
    effect(()=>{
      const bookings = this.bookingList();
      if(bookings){
        this.eventsList = bookings.map(booking => ({
          title: booking.name,
          date: booking.createdAt!,
        }));
        this.calendarOptions.events = this.eventsList;
      }
    })
  }
 
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    dateClick: (arg) => this.handleDateClick(arg),
    events: [],
    eventDidMount: (info) => {
      info.el.style.cursor = 'pointer';
    },
    contentHeight: 'auto',

  };

  handleDateClick(arg: DateClickArg) {
    /* alert('date click! ' + arg.dateStr) */
  }

}
