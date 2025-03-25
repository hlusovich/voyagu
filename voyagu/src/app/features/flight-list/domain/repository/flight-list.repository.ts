import { Observable } from 'rxjs';
import {FlightModel} from "../models/flight.model";

export abstract class FlightListRepository {
  abstract getFlights(): Observable<FlightModel[]>;
}
