import {FlightListFilterFields} from "../enums/flight-list.enums";
import {FlightListFilterSortFields} from "../enums/flight-sort-fields.enums";

export interface FlightListFilterValue {
  [FlightListFilterFields.SortBy]: FlightListFilterSortFields,
  [FlightListFilterFields.Price]: number,
  [FlightListFilterFields.Stops]: number[],
}
