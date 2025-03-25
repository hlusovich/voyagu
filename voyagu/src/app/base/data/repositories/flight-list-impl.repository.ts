import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FlightEntity} from "../entities/flight.entity";
import {FlightModel} from "../../domain/models/flight.model";
import {FlightMapper} from "../mappers/flight.mapper";
import {FlightListRepository} from "../../domain/repository/flight-list.repository";

@Injectable({
  providedIn: 'root',
})
export class FlightListImplRepository extends FlightListRepository {
  private flightMapper = new FlightMapper();

  constructor(private http: HttpClient) {
    super();
  }

  public getFlight(id: string): Observable<FlightModel | undefined> {
    return this.http.get<FlightEntity[]>('https://public-front-bucket.s3.eu-central-1.amazonaws.com/test/test_flights.json').pipe(
      map((entities) => entities.map((item) => this.flightMapper.mapFrom(item))),
      map((flights) => flights.find((flight) => flight.id.toString() === id))
    );
  }

  public getFlights(): Observable<FlightModel[]> {
    return this.http.get<FlightEntity[]>('https://public-front-bucket.s3.eu-central-1.amazonaws.com/test/test_flights.json').pipe(
      map((entity) => entity.map((item) => this.flightMapper.mapFrom(item))));
  }
}
