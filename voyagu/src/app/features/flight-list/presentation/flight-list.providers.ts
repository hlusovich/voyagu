import {FlightListRepository} from "../domain/repository/flight-list.repository";
import {GetFlightsUseCase} from "../domain/use-cases/get-flights.use-case";

const getFlightsUseCaseFactory =
  (userRepo: FlightListRepository) => new GetFlightsUseCase(userRepo);

export const userLoginUseCaseProvider = {
  provide: GetFlightsUseCase,
  useFactory: getFlightsUseCaseFactory,
  deps: [FlightListRepository],
};
