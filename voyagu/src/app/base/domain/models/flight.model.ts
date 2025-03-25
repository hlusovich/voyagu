import {FlightItemModel} from "./flight-item.model";

export interface FlightModel {
  id: number;
  price: number;
  flights: FlightItemModel[];
}
