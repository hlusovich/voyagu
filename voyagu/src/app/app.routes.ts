import {Routes} from '@angular/router';
import {FlightListContainerComponent} from "./features/flight-list/presentation/flight-list-container.component";
import {RoutesConstants} from "./base/constants/routes.constants";
import {BookingFormContainerComponent} from "./features/booking-form/presentation/booking-form-container.component";

export const routes: Routes = [
  {path: RoutesConstants.flightList, component: FlightListContainerComponent},
  {path: `${RoutesConstants.bookingForm}/:id`, component: BookingFormContainerComponent}
];
