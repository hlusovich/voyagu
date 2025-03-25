import {ChangeDetectionStrategy, Component} from '@angular/core';
import {userLoginUseCaseProvider} from "./flight-list.providers";
import {FlightListRepository} from "../domain/repository/flight-list.repository";
import {FlightListImplRepository} from "../data/repositories/flight-list-impl.repository";
import {FlightListComponent} from "./flight-list.component";
import {FlightListService} from "./services/flight-list.service";
import {AsyncPipe} from "@angular/common";
import {FlightListFilterValue} from "./interfaces/flight-list.interfaces";

@Component({
  selector: 'flight-list-container',
  standalone: true,
  template: '<flight-list (filterChange)="onChangePriceFilter($event)"  (showMore)="onShowMore()" [stops]="flightListService.stopsArray" [maxPrice]="flightListService.maxPrice"  [minPrice]="flightListService.minPrice" [isMore]="flightListService.isMore$ | async" [flights]="flightListService.flights$ | async" [isLoading]="flightListService.loading$ | async"/>',
  styleUrl: './flight-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FlightListComponent,
    AsyncPipe,
  ],
  providers: [FlightListService, userLoginUseCaseProvider, {
    provide: FlightListRepository,
    useClass: FlightListImplRepository
  }]
})
export class FlightListContainerComponent {
  constructor(protected readonly flightListService: FlightListService) {
    this.flightListService.getFlights();
  }

  protected onShowMore(): void {
    this.flightListService.showMore();
  }

  protected onChangePriceFilter(value: FlightListFilterValue): void {
    this.flightListService.changeFilter(value);
  }
}
