import {ChangeDetectionStrategy, Component, OnInit} from "@angular/core";
import {BookingFormComponent} from "./booking-form.component";
import {FlightListRepository} from "../../../base/domain/repository/flight-list.repository";
import {FlightListImplRepository} from "../../../base/data/repositories/flight-list-impl.repository";
import {getBookFlightUseCaseProvider, getFlightUseCaseProvider} from "./booking-form.providers";
import {BookingFormService} from "./services/booking-form.service";
import {AsyncPipe} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import {BookingSummaryService} from "./services/booking-summary.service";
import {BookFlightRepository} from "../domain/repository/book-flight.repository";
import {BookFlightImplRepository} from "../data/repositories/booking-form-impl.repository";
import {BookingFlightService} from "./services/book-flight.service";

@Component({
  selector: 'booking-form-container',
  standalone: true,
  template: '<booking-form (submitValue)="bookingFlightService.bookFlight($event)" [flight]="bookingSummaryService.flight$ | async" [isLoading]="bookingSummaryService.loading$ | async" [initialFilterState]="bookingFormService.getFormState() | async" (setFormState)="bookingFormService.setFormState($event)"/>',
  styleUrl: './booking-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    BookingFormComponent,
    AsyncPipe
  ],
  providers: [BookingSummaryService, BookingSummaryService, BookingFlightService, getBookFlightUseCaseProvider, getFlightUseCaseProvider, {
    provide: FlightListRepository,
    useClass: FlightListImplRepository
  },
    {
      provide: BookFlightRepository,
      useClass: BookFlightImplRepository
    }
  ]
})
export class BookingFormContainerComponent implements OnInit {
  constructor(
    protected bookingFormService: BookingFormService,
    protected bookingSummaryService: BookingSummaryService,
    protected bookingFlightService: BookingFlightService,
    private route: ActivatedRoute
  ) {
  }

  public ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.bookingSummaryService.getFlight(id);
    }
  }
}
