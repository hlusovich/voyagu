import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from "@angular/core";
import {BookingFormBodyComponent} from "./booking-form-body/booking-form-body.component";
import {BookingFormSummaryComponent} from "./booking-form-summary/booking-form-summary.component";
import {FlightModel} from "../../../base/domain/models/flight.model";
import {BookingFormModel} from "../domain/models/booking-form.model";

@Component({
  selector: 'booking-form',
  standalone: true,
  templateUrl: './booking-form.component.html',
  styleUrl: './booking-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    BookingFormBodyComponent,
    BookingFormSummaryComponent,
  ]
})
export class BookingFormComponent {
  @Input() initialFilterState: Partial<BookingFormModel> | null = {};
  @Input() isLoading: boolean | null = false;
  @Input() flight: FlightModel | null = null;

  @Output() readonly setFormState = new EventEmitter<Partial<BookingFormModel>>();
  @Output() readonly submitValue = new EventEmitter<BookingFormModel>();
}
