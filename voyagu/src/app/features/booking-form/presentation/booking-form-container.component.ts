import {ChangeDetectionStrategy, Component} from "@angular/core";
import {BookingFormComponent} from "./booking-form.component";

@Component({
  selector: 'booking-form-container',
  standalone: true,
  template: '<booking-form/>',
  styleUrl: './booking-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    BookingFormComponent
  ]
})
export class BookingFormContainerComponent {
}
