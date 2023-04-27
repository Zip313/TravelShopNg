import { Injectable } from '@angular/core';
// import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {INearestTour, ITour, ITourLocation} from "../../models/ITour";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TicketRestService {

  constructor(private http: HttpClient) {
  }

  getTickets(): Observable<ITour[]> {
    return this.http.get<ITour[]>('https://62b9e756ff109cd1dc9dae16.mockapi.io/apiv/v1/tours/')
  }

  getTicketById(id: string): Observable<ITour> {
    return this.http.get<ITour>(`https://62b9e756ff109cd1dc9dae16.mockapi.io/apiv/v1/tours/${id}`)
  }

  getRestError(): Observable<any> {
    return this.http.get<any>('https://error_mockapi.io/apiv/v1/tours/')
  }

  getNearestTickets(): Observable<INearestTour[]> {
    return this.http.get<INearestTour[]>(`https://62b9e756ff109cd1dc9dae16.mockapi.io/apiv/v1/nearestTours/`)
  }

  getNearestTicketsById(id: string): Observable<INearestTour[]> {
    return this.http.get<INearestTour[]>(`https://62b9e756ff109cd1dc9dae16.mockapi.io/apiv/v1/nearestTours/${id}`)
  }

  getLocationList(): Observable<ITourLocation[]> {
    return this.http.get<ITourLocation[]>(`https://62b9e756ff109cd1dc9dae16.mockapi.io/apiv/v1/location/`)
  }

  getRandomNearestEvent(type: number) {
    return this.http.get<INearestTour>(`/assets/mocks/nearestTours${++type}.json`);
  }

  sendTourData(data: any): Observable<any> {
    return this.http.post(`/assets/mocks/arr.json`,data);
  }
}
