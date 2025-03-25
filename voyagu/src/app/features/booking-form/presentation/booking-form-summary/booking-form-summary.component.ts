import {ChangeDetectionStrategy, Component, Input} from "@angular/core";
import {FlightModel} from "../../../../base/domain/models/flight.model";
import {CurrencyFormatPipe} from "../../../../shared/pipes/currency-format.pipe";
import {MatProgressSpinner} from "@angular/material/progress-spinner";

@Component({
  selector: 'booking-form-summary',
  standalone: true,
  templateUrl: './booking-form-summary.component.html',
  styleUrl: './booking-form-summary.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CurrencyFormatPipe,
    MatProgressSpinner
  ]
})
export class BookingFormSummaryComponent {
  @Input() flight: FlightModel | null = null;
  @Input() isLoading: boolean | null = false;
}
