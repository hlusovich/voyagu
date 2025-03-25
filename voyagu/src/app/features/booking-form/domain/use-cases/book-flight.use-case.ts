import {UseCaseInterfaces} from "../../../../base/interfaces/use-case.interfaces";
import {FlightListRepository} from "../../../../base/domain/repository/flight-list.repository";
import {Observable} from "rxjs";
import {FlightModel} from "../../../../base/domain/models/flight.model";

export class BookFlightUseCase
  implements UseCaseInterfaces<string, FlightModel | undefined> {

  constructor(private repository: FlightListRepository) {}

  public execute(id: string): Observable<FlightModel | undefined> {
    return this.repository.getFlight(id);
  }
}
