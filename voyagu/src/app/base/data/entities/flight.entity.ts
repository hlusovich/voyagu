import {FlightItemEntity} from "./flight-item.entity";

export interface FlightEntity {
  id: number;
  price: number;
  flights: FlightItemEntity[];
}
