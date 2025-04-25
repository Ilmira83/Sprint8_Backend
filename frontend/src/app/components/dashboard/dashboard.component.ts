import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive} from '@angular/router';
import { CommonModule } from '@angular/common';
import { BookingsService } from '../../services/bookings.service';



@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  bookingsService = inject(BookingsService);

  ngOnInit(): void {
    this.bookingsService.getListBookings();
  }

}
