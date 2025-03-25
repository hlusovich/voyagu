import {NoParamUseCase } from "../../../../base/interfaces/use-case.interfaces";
import {FlightListRepository} from "../../../../base/domain/repository/flight-list.repository";
import {Observable} from "rxjs";
import {FlightModel} from "../../../../base/domain/models/flight.model";

export class GetFlightsUseCase
  implements NoParamUseCase<FlightModel[]> {

  constructor(private repository: FlightListRepository) {}

  public execute(): Observable<FlightModel[]> {
    return this.repository.getFlights();
  }
}
