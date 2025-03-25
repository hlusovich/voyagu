import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {BookingFlightMapper} from "../mappers/booking-flight.mapper";
import {BookFlightRepository} from "../../domain/repository/book-flight.repository";
import {BookingFormModel} from "../../domain/models/booking-form.model";

@Injectable({
  providedIn: 'root',
})
export class BookFlightImplRepository extends BookFlightRepository {
  private flightMapper = new BookingFlightMapper();

  constructor(private http: HttpClient) {
    super();
  }

  public bookFlight(model: BookingFormModel): Observable<boolean> {
    return of(true)
  }
}
