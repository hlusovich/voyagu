import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {BookingFormModel} from "../../domain/models/booking-form.model";

@Injectable({
  providedIn: 'root',

})
export class BookingFormService {
  private formState = new BehaviorSubject<Partial<BookingFormModel>>({});

  public setFormState(state: Partial<BookingFormModel>): void {
    this.formState.next(state);
  }

  public getFormState(): Observable<Partial<BookingFormModel>> {
    return this.formState.asObservable();
  }
}
