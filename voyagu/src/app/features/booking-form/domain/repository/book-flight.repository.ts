import {Observable} from 'rxjs';
import {BookingFormModel} from "../models/booking-form.model";

export abstract class BookFlightRepository {
  abstract bookFlight(model: BookingFormModel): Observable<boolean>;}

