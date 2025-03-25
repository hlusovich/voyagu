import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {FlightModel} from "../../../../base/domain/models/flight.model";
import {GetFlightUseCase} from "../../domain/use-cases/get-flight.use-case";
import {RoutesConstants} from "../../../../base/constants/routes.constants";
import {Router} from "@angular/router";
import {BookingFormModel} from "../../domain/models/booking-form.model";

@Injectable()
export class BookingSummaryService {
  private formState = new BehaviorSubject<Partial<BookingFormModel>>({});
  private loadingSubject = new BehaviorSubject<boolean>(true);
  private flightSubject = new Subject<FlightModel>();

  public loading$ = this.loadingSubject.asObservable();
  public flight$ = this.flightSubject.asObservable();

  constructor(private useCase: GetFlightUseCase, private router: Router) {
  }

  public getFlight(id: string): void {
    this.loadingSubject.next(true);
    this.useCase.execute(id).subscribe({
      next: (data) => {
        if(data) {
          this.flightSubject.next(data);
        }else {
          this.navigateToList()
        }

        this.loadingSubject.next(false);
      },
      error: (error) => {
        this.flightSubject.error(error);
        this.loadingSubject.next(false);
      }
    });
  }

  protected navigateToList(id?: number): void {
    this.router.navigate([`${RoutesConstants.flightList}`]);
  }
}
