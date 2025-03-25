import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Router} from "@angular/router";
import {BookingFormModel} from "../../domain/models/booking-form.model";
import {BookFlightUseCase} from "../../domain/use-cases/book-flight.use-case";

@Injectable()
export class BookingFlightService {
  private loadingSubject = new BehaviorSubject<boolean>(true);

  public loading$ = this.loadingSubject.asObservable();

  constructor(private useCase: BookFlightUseCase, private router: Router) {
  }

  public bookFlight(model: BookingFormModel): void {
    this.loadingSubject.next(true);
    this.useCase.execute(model).subscribe({
      next: (data) => {
        this.loadingSubject.next(false);
      },
      error: (error) => {
        this.loadingSubject.next(false);
      }
    });
  }

}
