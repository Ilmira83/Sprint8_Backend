import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive} from '@angular/router';
import { BookingsService } from '../../../services/bookings.service';
import { AddEditDeleteComponent } from "../../../pages/add-edit-delete/add-edit-delete.component";

@Component({
  selector: 'app-modal',
  imports: [RouterLink, RouterLinkActive, AddEditDeleteComponent],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  bookingsService = inject(BookingsService);
}
