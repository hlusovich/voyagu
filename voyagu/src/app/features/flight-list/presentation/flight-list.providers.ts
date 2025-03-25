import {FlightListRepository} from "../../../base/domain/repository/flight-list.repository";
import {GetFlightsUseCase} from "../domain/use-cases/get-flights.use-case";

const getFlightsUseCaseFactory =
  (userRepo: FlightListRepository) => new GetFlightsUseCase(userRepo);

export const getFlightsUseCaseProvider = {
  provide: GetFlightsUseCase,
  useFactory: getFlightsUseCaseFactory,
  deps: [FlightListRepository],
};
