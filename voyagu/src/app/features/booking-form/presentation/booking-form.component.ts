import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from "@angular/core";
import {BookingFormBodyComponent} from "./booking-form-body/booking-form-body.component";
import {BookingFormSummaryComponent} from "./booking-form-summary/booking-form-summary.component";
import {BookingFormValue} from "./interfaces/booking-form.interface";
import {JsonPipe} from "@angular/common";
import {FlightModel} from "../../../base/domain/models/flight.model";

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
  @Input() initialFilterState: Partial<BookingFormValue> | null = {};
  @Input() isLoading: boolean | null = false;
  @Input() flight: FlightModel | null = null;

  @Output() readonly setFormState = new EventEmitter<Partial<BookingFormValue>>();
}
