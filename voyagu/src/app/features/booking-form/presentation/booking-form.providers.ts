import {FlightListRepository} from "../../../base/domain/repository/flight-list.repository";
import {GetFlightUseCase} from "../domain/use-cases/get-flight.use-case";
import {BookFlightUseCase} from "../domain/use-cases/book-flight.use-case";
import {BookFlightRepository} from "../domain/repository/book-flight.repository";

const getFlightUseCaseFactory =
  (repo: FlightListRepository) => new GetFlightUseCase(repo);

export const getFlightUseCaseProvider = {
  provide: GetFlightUseCase,
  useFactory: getFlightUseCaseFactory,
  deps: [FlightListRepository],
};

const bookFlightUseCaseFactory =
  (repo: BookFlightRepository) => new BookFlightUseCase(repo);

export const getBookFlightUseCaseProvider = {
  provide: BookFlightUseCase,
  useFactory: bookFlightUseCaseFactory,
  deps: [BookFlightRepository],
};
