import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {FlightModel} from "../../../../../../base/domain/models/flight.model";
import {FlightItemModel} from "../../../../../../base/domain/models/flight-item.model";
import {DateFormatPipe} from "../../../../../../shared/pipes/date-time.pipe";
import {TimeFormatPipe} from "../../../../../../shared/pipes/time.pipe";
import {DurationFormatPipe} from "../../../../../../shared/pipes/duration-format.pipe";
import {StopsFormatPipe} from "../../../pipes/stops-format.pipe";

@Component({
  selector: 'flight-list-item-row',
  standalone: true,
  templateUrl: './flight-list-item-row.component.html',
  styleUrl: './flight-list-item-row.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    DateFormatPipe,
    TimeFormatPipe,
    DurationFormatPipe,
    StopsFormatPipe
  ]
})
export class FlightListItemRowComponent {
  @Input() data: FlightItemModel | null = null;
}
