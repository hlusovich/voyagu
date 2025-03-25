import {ChangeDetectionStrategy, Component} from "@angular/core";
import {BookingFormBodyComponent} from "./booking-form-body/booking-form-body.component";
import {BookingFormSummaryComponent} from "./booking-form-summary/booking-form-summary.component";

@Component({
  selector: 'booking-form',
  standalone: true,
  templateUrl: './booking-form.component.html',
  styleUrl: './booking-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    BookingFormBodyComponent,
    BookingFormSummaryComponent
  ]
})
export class BookingFormComponent {
}
