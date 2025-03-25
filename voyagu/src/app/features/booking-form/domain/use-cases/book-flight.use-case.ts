import {UseCaseInterfaces} from "../../../../base/interfaces/use-case.interfaces";
import {FlightListRepository} from "../../../../base/domain/repository/flight-list.repository";
import {Observable} from "rxjs";
import {FlightModel} from "../../../../base/domain/models/flight.model";
import {BookFlightRepository} from "../repository/book-flight.repository";
import {BookingFormModel} from "../models/booking-form.model";

export class BookFlightUseCase
  implements UseCaseInterfaces<BookingFormModel, boolean> {

  constructor(private repository: BookFlightRepository) {}

  public execute(model: BookingFormModel): Observable<boolean> {
    return this.repository.bookFlight(model);
  }
}
