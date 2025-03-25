import {Mapper} from '../../utils/mapper';
import {FlightEntity} from '../entities/flight.entity';
import {FlightModel} from '../../domain/models/flight.model';
import {FlightItemEntity} from "../entities/flight-item.entity";
import {FlightItemModel} from "../../domain/models/flight-item.model";

export class FlightMapper extends Mapper<FlightEntity, FlightModel> {
 public mapFrom(param: FlightEntity): FlightModel {
    return {
      id: param.id,
      price: param.price,
      flights: param.flights.map(flight => this.mapFlightItemFrom(flight))
    };
  }

  public mapTo(param: FlightModel): FlightEntity {
    return {
      id: param.id,
      price: param.price,
      flights: param.flights.map(flight => this.mapFlightItemTo(flight))
    };
  }

  public mapFlightItemFrom(param: FlightItemEntity): FlightItemModel {
    return {
      departureDate: param.departure_date,
      departureTime: param.departure_time,
      departureAirport: param.departure_airport,
      durationMinutes: param.duration_minutes,
      arrivalDate: param.arrival_date,
      arrivalTime: param.arrival_time,
      arrivalAirport: param.arrival_airport,
      stops: param.stops,
      airline: param.airline
    };
  }

  public mapFlightItemTo(param: FlightItemModel): FlightItemEntity {
    return {
      departure_date: param.departureDate,
      departure_time: param.departureTime,
      departure_airport: param.departureAirport,
      duration_minutes: param.durationMinutes,
      arrival_date: param.arrivalDate,
      arrival_time: param.arrivalTime,
      arrival_airport: param.arrivalAirport,
      stops: param.stops,
      airline: param.airline
    };
  }
}
