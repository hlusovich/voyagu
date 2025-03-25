import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {FlightModel} from "../domain/models/flight.model";
import {FlightListFilterComponent} from "./components/flight-list-filter/flight-list-filter.component";
import {FlightListItemComponent} from "./components/flight-list-item/flight-list-item.component";
import {MatButton} from "@angular/material/button";
import {MatCheckbox} from "@angular/material/checkbox";
import {FlightListFilterValue} from "./interfaces/flight-list.interfaces";
import {MatProgressSpinner} from "@angular/material/progress-spinner";

@Component({
  selector: 'flight-list',
  standalone: true,
  templateUrl: './flight-list.component.html',
  styleUrl: './flight-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FlightListFilterComponent,
    FlightListItemComponent,
    MatButton,
    MatCheckbox,
    MatProgressSpinner
  ]
})
export class FlightListComponent {
  @Input() isLoading: boolean | null = true;
  @Input() isMore: boolean | null = true;
  @Input() flights: FlightModel[] | null = [];
  @Input() maxPrice: number | undefined;
  @Input() minPrice: number | undefined;
  @Input() stops: number[] = [];

  @Output() readonly showMore = new EventEmitter<void>();
  @Output() readonly filterChange = new EventEmitter<FlightListFilterValue>();
}
