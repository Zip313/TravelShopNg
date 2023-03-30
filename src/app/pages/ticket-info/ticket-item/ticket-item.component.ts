import { Component, OnInit } from '@angular/core';
import {ITour} from "../../../models/ITour";
import {ActivatedRoute} from "@angular/router";
import {TicketsStorageService} from "../../../services/tickets-storage/tickets-storage.service";

@Component({
  selector: 'app-ticket-item',
  templateUrl: './ticket-item.component.html',
  styleUrls: ['./ticket-item.component.scss']
})
export class TicketItemComponent implements OnInit {
  ticket?: ITour;

  constructor(private route:ActivatedRoute,
              private ticketStorage:TicketsStorageService) { }

  ngOnInit(): void {
    const routeIdParam = this.route.snapshot.paramMap.get('id');
    const queryIdParam = this.route.snapshot.queryParamMap.get('id');

    const paramValueId = routeIdParam || queryIdParam;
    if(paramValueId){
      const tickets = this.ticketStorage.getStorage();
      this.ticket = tickets.find((el)=>el.id === paramValueId);
      console.log('this ticket', this.ticket);
    }
  }

}
