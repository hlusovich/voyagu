import {Pipe, PipeTransform} from '@angular/core';
import {DAYS_IN_A_WEEK, HOURS_IN_A_DAY, MINUTES_IN_HOUR} from "../../base/constants/time.constants";
import {TimeUnits} from "../../base/enums/time-units.enum";

@Pipe({
  name: 'durationFormat',
  standalone: true,
})
export class DurationFormatPipe implements PipeTransform {
  public transform(value?: number): string {
    if (!value) {
      return '-';
    }

    const weeks = Math.floor(value / (MINUTES_IN_HOUR * HOURS_IN_A_DAY * DAYS_IN_A_WEEK));
    const days = Math.floor((value % (MINUTES_IN_HOUR * HOURS_IN_A_DAY * DAYS_IN_A_WEEK)) / (MINUTES_IN_HOUR * HOURS_IN_A_DAY));
    const hours = Math.floor((value % (MINUTES_IN_HOUR * HOURS_IN_A_DAY)) / MINUTES_IN_HOUR);
    const minutes = value % MINUTES_IN_HOUR;

    let result = '';

    if (weeks > 0) {
      result += `${weeks}${TimeUnits.Weeks} `;
    }
    if (days > 0) {
      result += `${days}${TimeUnits.Days} `;
    }
    if (hours > 0) {
      result += `${hours}${TimeUnits.Hours} `;
    }
    if (minutes > 0) {
      result += `${minutes}${TimeUnits.Minutes}`;
    }


    return result.trim();
  }

}
