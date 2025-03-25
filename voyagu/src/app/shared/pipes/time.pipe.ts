import { Pipe, PipeTransform } from '@angular/core';
import {Period} from "../../base/enums/period.enum";

@Pipe({
  name: 'timeFormat',
  standalone: true,
})
export class TimeFormatPipe implements PipeTransform {
  public transform(value?: string): string {
    if(!value) {
      return '-';
    }

    const [hours, minutes] = value.split(':').map(Number);
    const period = hours >= 12 ? Period.PM : Period.AM;
    const hour = hours % 12 || 12;

    return `${hour}:${minutes} ${period}`;
  }
}
