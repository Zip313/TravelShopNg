import { Injectable } from '@angular/core';
import {TicketRestService} from "../rest/ticket-rest.service";
import {Observable} from "rxjs";
import {ITour} from "../../models/ITour";

@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  constructor(private ticketRestService:TicketRestService) { }

  getTickets(): Observable<ITour[]> {
    return this.ticketRestService.getTickets();
  }

}
