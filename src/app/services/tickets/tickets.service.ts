import { Injectable } from '@angular/core';
import {TicketRestService} from "../rest/ticket-rest.service";
import {concat, forkJoin, map, Observable, Subject} from "rxjs";
import {INearestTour, ITour, ITourLocation, ITourTypeSelect} from "../../models/ITour";
import {tick} from "@angular/core/testing";

@Injectable({
  providedIn: 'root'
})
export class TicketsService {
  private ticketSubject = new Subject<ITourTypeSelect>();
  readonly ticketType$ = this.ticketSubject.asObservable();

  getTicketTypeObservable(): Observable<ITourTypeSelect> {
    return this.ticketSubject.asObservable();
  }

  updateTour(type:ITourTypeSelect):void {
    this.ticketSubject.next(type);
  }
  constructor(private ticketRestService:TicketRestService) { }

  getTickets(): Observable<ITour[]> {
    return this.ticketRestService.getTickets().pipe(
      map((value, index)=> {
        const singleTours = value.filter((el)=>el.type === "single");

        return value.concat(singleTours);
      }),
      map((value, index)=> {
          return value.sort((a,b)=>(a.name.length+a.description.length)-(b.name.length+b.description.length));
        }),
    );
  }

  getTicketInfoById(id:string): Observable<[ITour,INearestTour[],ITourLocation[]]> {
    // const ticketPromise = this.ticketRestService.getTicketById(id).toPromise() as Promise<ITour>;
    // const nearestPromise = forkJoin([this.ticketRestService.getNearestTickets(), this.ticketRestService.getLocationList()])
    //   .pipe(map(data => {
    //     data[0].forEach(n => {
    //       n.location = data[1].find(l => n.locationId == l.id)
    //     });
    //     return [data[0], data[1]] as [INearestTour[], ITourLocation[]];
    //   })).toPromise() as Promise<[INearestTour[],ITourLocation[]]>;
    // const responses = await Promise.all([ticketPromise,nearestPromise]);
    //
    // const ticket = responses[0];
    // const [nearestTours,toursLocation] = responses[1];
    //
    // return [ticket,nearestTours,toursLocation];


    const result = forkJoin([this.ticketRestService.getTicketById(id),this.ticketRestService.getNearestTickets(), this.ticketRestService.getLocationList()])
      .pipe(map(data => {
        data[1].forEach(n => {
          n.location = data[2].find(l => n.locationId == l.id)
        });
        return [data[0], data[1], data[2]] as [ITour,INearestTour[], ITourLocation[]];
      }))
    return result;
  }

  getError():Observable<any> {
    return this.ticketRestService.getRestError();
  }

  getNearestTickets():Observable<INearestTour[]> {
    return this.ticketRestService.getNearestTickets();
  }
  getNearestTicketsById(id:string):Observable<INearestTour[]> {
    return this.ticketRestService.getNearestTicketsById(id);
  }

  getTicketsLocation():Observable<ITourLocation[]> {
    return this.ticketRestService.getLocationList();
  }

  getRandomNearestEvent(type: number) {
    return this.ticketRestService.getRandomNearestEvent(type);
  }

  getNearestToursWithLocation(nearestTours: INearestTour[], toursLocation: ITourLocation[]) {
    nearestTours.forEach(n=>{
      n.location = toursLocation.find(l => n.locationId == l.id)
    })
    return nearestTours;
  }
  sendTour(data: any):Observable<any>{
    return this.ticketRestService.sendTourData(data);
  }
}
