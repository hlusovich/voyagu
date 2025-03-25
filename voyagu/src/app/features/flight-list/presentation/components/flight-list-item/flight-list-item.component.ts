import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {FlightListItemRowComponent} from "./flight-list-item-row/flight-list-item-row.component";
import {MatButton} from "@angular/material/button";
import {FlightModel} from "../../../../../base/domain/models/flight.model";
import {RoutesConstants} from "../../../../../base/constants/routes.constants";
import {Router} from "@angular/router";
import {CurrencyFormatPipe} from "../../../../../shared/pipes/currency-format.pipe";

@Component({
  selector: 'flight-list-item',
  standalone: true,
  templateUrl: './flight-list-item.component.html',
  styleUrl: './flight-list-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FlightListItemRowComponent, MatButton, CurrencyFormatPipe]
})
export class FlightListItemComponent {
  @Input() data: FlightModel | null = null;

  constructor(private router: Router) {}

  protected navigateToBookingForm(id?: number): void {
    if(!id) {
      return;
    }

    this.router.navigate([`${RoutesConstants.bookingForm}`, id.toString()]);
  }
}
