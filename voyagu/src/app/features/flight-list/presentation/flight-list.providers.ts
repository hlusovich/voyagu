import {FlightListRepository} from "../../../base/domain/repository/flight-list.repository";
import {GetFlightsUseCase} from "../domain/use-cases/get-flights.use-case";

const getFlightsUseCaseFactory =
  (repo: FlightListRepository) => new GetFlightsUseCase(repo);

export const getFlightsUseCaseProvider = {
  provide: GetFlightsUseCase,
  useFactory: getFlightsUseCaseFactory,
  deps: [FlightListRepository],
};
