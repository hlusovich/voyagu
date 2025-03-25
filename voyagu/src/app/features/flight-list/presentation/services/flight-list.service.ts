import {Injectable} from '@angular/core';
import {BehaviorSubject, combineLatest, Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import {GetFlightsUseCase} from '../../domain/use-cases/get-flights.use-case';
import {FlightModel} from "../../domain/models/flight.model";
import {FlightListFilterValue} from "../interfaces/flight-list.interfaces";
import {FlightListFilterFields} from "../enums/flight-list.enums";
import {FlightListFilterSortFields} from "../enums/flight-sort-fields.enums";
import {FlightListStops} from "../enums/fligth-stops.enum";

@Injectable({
  providedIn: 'root'
})
export class FlightListService {
  private step = 5;
  private flightsSubject = new Subject<FlightModel[]>();
  private loadingSubject = new BehaviorSubject<boolean>(true);
  private isMoreSubject = new BehaviorSubject<boolean>(false);
  private filterSubject = new BehaviorSubject<FlightListFilterValue | null>(null);
  private currentItemsCount = 5;
  private flights: FlightModel[] = [];
  private sortByConfig: Record<FlightListFilterSortFields, (items: FlightModel[]) => FlightModel[]> = {
    [FlightListFilterSortFields.DepartureDesc]: (items) => items.sort((a, b) => {
      const dateA = new Date(`${a.flights[0].departureDate}T${a.flights[0].departureTime}`);
      const dateB = new Date(`${b.flights[0].departureDate}T${b.flights[0].departureTime}`);
      return dateB.getTime() - dateA.getTime();
    }),
    [FlightListFilterSortFields.DepartureAsc]: (items) => items.sort((a, b) => {
      const dateA = new Date(`${a.flights[0].departureDate}T${a.flights[0].departureTime}`);
      const dateB = new Date(`${b.flights[0].departureDate}T${b.flights[0].departureTime}`);
      return dateA.getTime() - dateB.getTime();
    }),
    [FlightListFilterSortFields.PriceAsc]: (items) => items.sort((a, b) => a.price - b.price),
    [FlightListFilterSortFields.PriceDesc]: (items) => items.sort((a, b) => b.price - a.price),
    [FlightListFilterSortFields.NoSort]: (items) => items
  };

  public flights$ = combineLatest([this.flightsSubject, this.filterSubject]).pipe(
    map(([_, filter]) => {
      const items = this.applyFilter(this.flights, filter);
      this.isMoreSubject.next(this.currentItemsCount < items.length);
      return items.slice(0, this.currentItemsCount);
    })
  );
  public loading$ = this.loadingSubject.asObservable();
  public isMore$ = this.isMoreSubject.asObservable();
  public maxPrice: number | undefined;
  public minPrice: number | undefined;
  public stopsArray: number[] = [];

  constructor(private useCase: GetFlightsUseCase) {
  }

  public getFlights(): void {
    this.loadingSubject.next(true);
    this.useCase.execute().subscribe({
      next: (data) => {
        this.flights = data;
        this.calculatePriceRange(data);
        this.showMore();
        this.stopsArray = this.generateStopsArray(data);
        this.loadingSubject.next(false);
      },
      error: (error) => {
        this.flightsSubject.error(error);
        this.loadingSubject.next(false);
      }
    });
  }

  public changeFilter(filter: FlightListFilterValue): void {
    this.onFilterChange();
    this.filterSubject.next(filter);
  }

  public showMore(): void {
    this.currentItemsCount += this.step;
    this.currentItemsCount = Math.min(this.currentItemsCount, this.flights.length);
    this.isMoreSubject.next(this.currentItemsCount < this.flights.length);
    this.flightsSubject.next(this.flights.slice(0, this.currentItemsCount));
  }

  private onFilterChange(): void {
    this.currentItemsCount = 5;
  }

  private applyFilter(flights: FlightModel[], filter: FlightListFilterValue | null): FlightModel[] {
    const priceFilter = filter?.[FlightListFilterFields.Price];
    const sortByFilter = filter?.[FlightListFilterFields.SortBy];
    const stopsFilter = filter?.[FlightListFilterFields.Stops];
    let result = flights;

    if (priceFilter && this.minPrice && priceFilter > this.minPrice) {
      result = flights.filter(flight => {
          return flight.price > priceFilter;
        }
      );
    }

    if (stopsFilter && stopsFilter.length > 0 && !stopsFilter.includes(FlightListStops.AllStops)) {
      const stopsSet = new Set(stopsFilter);
      result = result.filter(flight => {
        return flight.flights.some(f => stopsSet.has(f.stops));
      });
    }

    if (sortByFilter) {
      this.sortByConfig[sortByFilter](result);
    }

    return result;
  }

  private calculatePriceRange(flights: FlightModel[]): void {
    if (flights.length > 0) {
      this.maxPrice = Math.max(...flights.map(flight => flight.price));
      this.minPrice = Math.min(...flights.map(flight => flight.price));
    } else {
      this.maxPrice = undefined;
      this.minPrice = undefined;
    }
  }

  private generateStopsArray(flights: FlightModel[]): number[] {
    const stopsSet = new Set<number>();
    stopsSet.add(FlightListStops.AllStops);

    flights.forEach(flight => {
      flight.flights.forEach(f => {
        stopsSet.add(f.stops);
      });
    });

    return Array.from(stopsSet).sort((a, b) => a - b);
  }
}
