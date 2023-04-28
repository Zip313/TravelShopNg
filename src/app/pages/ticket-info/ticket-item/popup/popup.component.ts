import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {distinct, filter, from, fromEvent, map, mergeAll, Observable, Subscription, take, toArray} from "rxjs";
import {ITour} from "../../../../models/ITour";
import {TicketsService} from "../../../../services/tickets/tickets.service";

@Component({
  selector: 'app-popup',
  template: `
    <div *ngIf="!isClosed">
    <div *ngIf=" searchResult$|async as searchResult">
      <div *ngFor="let result of searchResult"
           class="border rounded bg-light"
      >
        <div (click)="handleClick(result.name)">
          {{result.name}}
        </div>

      </div>
    </div>
    </div>
  `,
  styles: [
  ]
})
export class PopupComponent implements OnInit {
  @Output() searchTerm:EventEmitter<string> = new EventEmitter<string>();
  searchResult$: Observable<ITour[]>;
  isClosed: Boolean = true;
  searchTicket(searchTerm: string): Observable<ITour[]> {
    return from(this.ticketsService.getTickets())
      .pipe(
        mergeAll(),
        distinct(x=>x.name),
        filter((ticket)=> ticket.name.toLocaleLowerCase().indexOf(searchTerm) !== -1),
        take(5),
        toArray(),
        map(arr=>arr.sort((a,b)=>('' + a.name).localeCompare(b.name))),
      )
  }

  public onChange(searchTerm: string){
      this.isClosed = searchTerm=='';
      this.searchResult$ = this.searchTicket(searchTerm);

  }
  constructor(private ticketsService:TicketsService) { }

  ngOnInit(): void {

  }

  handleClick(text:string) {
    this.isClosed = true;
    this.searchTerm.emit(text);
  }
}
