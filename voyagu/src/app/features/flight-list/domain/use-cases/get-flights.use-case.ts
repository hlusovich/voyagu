import {NoParamUseCase, UseCaseInterfaces} from "../../../../base/interfaces/use-case.interfaces";
import {FlightListRepository} from "../repository/flight-list.repository";
import {Observable} from "rxjs";
import {FlightModel} from "../models/flight.model";

export class GetFlightsUseCase
  implements NoParamUseCase<FlightModel[]> {

  constructor(private repository: FlightListRepository) {}

  public execute(): Observable<FlightModel[]> {
    return this.repository.getFlights();
  }
}
