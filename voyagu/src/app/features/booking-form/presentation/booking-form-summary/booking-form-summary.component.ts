import {ChangeDetectionStrategy, Component} from "@angular/core";

@Component({
  selector: 'booking-form-summary',
  standalone: true,
  templateUrl: './booking-form-summary.component.html',
  styleUrl: './booking-form-summary.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingFormSummaryComponent {

}
