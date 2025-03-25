import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {BookingFormValue} from '../interfaces/booking-form.interface';
import {GetFlightsUseCase} from "../../../flight-list/domain/use-cases/get-flights.use-case";
import {FlightModel} from "../../../../base/domain/models/flight.model";
import {GetFlightUseCase} from "../../domain/use-cases/get-flight.use-case";
import {RoutesConstants} from "../../../../base/constants/routes.constants";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root',

})
export class BookingFormService {
  private formState = new BehaviorSubject<Partial<BookingFormValue>>({});

  public setFormState(state: Partial<BookingFormValue>): void {
    this.formState.next(state);
  }

  public getFormState(): Observable<Partial<BookingFormValue>> {
    return this.formState.asObservable();
  }
}
