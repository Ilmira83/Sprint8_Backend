import { Component, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router} from '@angular/router';
import { FullCalendarModule } from '@fullcalendar/angular'
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { BookingsService } from '../../services/bookingsAPI.service';


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
  router = inject(Router);

  constructor(){
    effect(()=>
      this.eventsList = this.bookingList.value()!.map(booking => ({
        title: booking.name,
        date: booking.startDate,   
     }))
    )
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
      this.router.navigate(['/modal'])
    },
  
  };
  
  handleDateClick(arg: DateClickArg) {
    const date = arg.date.toLocaleDateString('sv-SE').split('T')[0];
    this.router.navigate(['/modal'], {queryParams: { startDate: date }});
  }

}
