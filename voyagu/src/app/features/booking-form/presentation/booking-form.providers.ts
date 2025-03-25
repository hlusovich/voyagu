import {FlightListRepository} from "../../../base/domain/repository/flight-list.repository";
import {GetFlightUseCase} from "../domain/use-cases/get-flight.use-case";

const getFlightUseCaseFactory =
  (userRepo: FlightListRepository) => new GetFlightUseCase(userRepo);

export const getFlightUseCaseProvider = {
  provide: GetFlightUseCase,
  useFactory: getFlightUseCaseFactory,
  deps: [FlightListRepository],
};
