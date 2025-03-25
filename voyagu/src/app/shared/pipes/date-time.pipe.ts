import {Pipe, PipeTransform} from '@angular/core';
import {StringUtil} from "../../base/utils/string.utils";

@Pipe({
  name: 'dateFormat',
  standalone: true,
})
export class DateFormatPipe implements PipeTransform {

  public transform(value?: string): string {
    if(!value) {
      return '-';
    }

    const date = new Date(value);
    const options: Intl.DateTimeFormatOptions = {month: 'short', day: 'numeric'};
    return StringUtil.toTitleCase(date.toLocaleDateString('en-US', options));
  }
}
