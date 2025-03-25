import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  signal,
} from '@angular/core';
import {MatSelectModule} from "@angular/material/select";
import {MatSlider, MatSliderThumb} from "@angular/material/slider";
import {MatCheckbox} from "@angular/material/checkbox";
import {SelectOption} from "../../../../../shared/interfaces/select-option.interface";
import {FlightListFilterFields} from "../../enums/flight-list.enums";
import {FlightListFilterValue} from "../../interfaces/flight-list.interfaces";
import {TypedSimpleChanges} from "../../../../../base/types/typed-change.type";
import {FlightListFilterSortFields} from "../../enums/flight-sort-fields.enums";
import {StopsFormatPipe} from "../../pipes/stops-format.pipe";
import {NumberFormatPipe} from "../../../../../shared/pipes/number-format.pipe";

@Component({
  selector: 'flight-list-filter',
  standalone: true,
  templateUrl: './flight-list-filter.component.html',
  styleUrl: './flight-list-filter.component.scss',
  imports: [MatSelectModule, MatSlider, MatSliderThumb, MatCheckbox, StopsFormatPipe, NumberFormatPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlightListFilterComponent implements OnChanges {
  @Input() stops: number[] = [];
  @Input() maxPrice: number | undefined;
  @Input() minPrice: number | undefined;

  @Output() readonly valueChange = new EventEmitter<FlightListFilterValue>();

  protected readonly filterFields = FlightListFilterFields;
  protected readonly checkedStops = signal<boolean[]>([]);
  protected readonly price = signal<number>(0);
  protected readonly sortBy = signal<FlightListFilterSortFields>(FlightListFilterSortFields.NoSort);
  protected readonly sortByOptions: SelectOption[] = Object.values(FlightListFilterSortFields).map((value) => ({
    title: value,
    value,
  }));


  constructor() {
    effect(() => {
      const selectedStops = this.stops.filter((_, index) => this.checkedStops()[index])
      if (this.sortBy() || (this.price() && this.price() !== this.minPrice) || selectedStops.length) {
        this.valueChange.emit({
          [this.filterFields.SortBy]: this.sortBy(),
          [this.filterFields.Price]: this.price(),
          [this.filterFields.Stops]: selectedStops,
        });
      }
    });
  }

  public ngOnChanges(changes: TypedSimpleChanges<FlightListFilterComponent>): void {
    if (changes.stops && this.stops) {
      this.checkedStops.set(this.stops.map(() => true));
    }

    if (changes.minPrice && this.minPrice) {
      this.price.set(this.minPrice);
    }
  }

  protected toggleCheckbox(index: number): void {
    const newCheckedStates = [...this.checkedStops()];
    newCheckedStates[index] = !newCheckedStates[index];
    this.checkedStops.set(newCheckedStates);
  }

  protected updateSliderValue(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.price.set(parseFloat(input.value));
  }

  protected updateSortBy(value: FlightListFilterSortFields): void {
    this.sortBy.set(value);
  }

  protected countStep(): number {
    if(!this.maxPrice || !this.minPrice) {
      return 1;
    }

    return Math.round((this.maxPrice - this.minPrice) / 100);
  }
}
