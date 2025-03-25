import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {BookingFormValue} from '../interfaces/booking-form.interface';

@Injectable({
  providedIn: 'root'
})
export class BookingFormService {
  private formState = new BehaviorSubject<Partial<BookingFormValue>>({});

  public setFormState(state: Partial<BookingFormValue>): void {
    this.formState.next(state);
  }

  public getFormState(): Partial<BookingFormValue> {
    return this.formState.value;
  }
}
