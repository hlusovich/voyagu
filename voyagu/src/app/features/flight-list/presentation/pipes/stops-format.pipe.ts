import {Pipe, PipeTransform} from '@angular/core';
import {FlightListStops} from "../enums/fligth-stops.enum";

@Pipe({
  name: 'stopsFormat',
  standalone: true,
})
export class StopsFormatPipe implements PipeTransform {

  public transform(value?: number): string {
    if (!value && value !== 0) {
      return '-'
    } else if (value === FlightListStops.AllStops) {
      return 'All Stops';
    } else if (value === FlightListStops.Nonstop) {
      return 'Nonstop';
    } else if (value === 1) {
      return '1 stop';
    } else {
      return `${value} stops`;
    }
  }
}
