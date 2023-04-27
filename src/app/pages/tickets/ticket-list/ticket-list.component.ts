import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {TicketsService} from "../../../services/tickets/tickets.service";
import {ITour, ITourTypeSelect} from "../../../models/ITour";
import {TicketsStorageService} from "../../../services/tickets-storage/tickets-storage.service";
import {Router} from "@angular/router";
import {BlocksStyleDirective} from "../../../directive/blocks-style.directive";
import {debounceTime, fromEvent, Subscription} from "rxjs";

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss'],
})
export class TicketListComponent implements OnInit, AfterViewInit, OnDestroy {
  tickets:ITour[]=[];
  @ViewChild('blockDirective',{read: BlocksStyleDirective}) blockDirective:BlocksStyleDirective;
  @ViewChild('tourWrap') tourWrap:ElementRef;

  ticketsCopy:ITour[]=[];
  ticketsCount:number=0;
  ticketsFilteredCount:number=0;

  @ViewChild('ticketSearchInput') ticketSearchInput: ElementRef;
  searchText:string = '';
  searchTicketSub:Subscription;
  ticketType:ITourTypeSelect = {value:'all'};
  tourUnsubscriber: Subscription;

  constructor(private ticketsService:TicketsService,
              private ticketsStorage:TicketsStorageService,
              private router:Router) {}

  ngAfterViewInit(): void {
    const fromEventObserver = fromEvent(this.ticketSearchInput.nativeElement,'keyup',{passive: true});
    this.searchTicketSub = fromEventObserver
      .pipe(
        debounceTime(500)
      )
      .subscribe((ev)=>{
          this.searchTickets();
      });
    }

  ngOnInit(): void {
    this.ticketsService.getTickets()
      .subscribe(
        (data)=>{
          this.tickets=data;
          this.ticketsStorage.setStorage(data);
          this.ticketsCopy = [...data];
          this.ticketsCount=this.tickets.length;
          this.ticketsFilteredCount=this.ticketsCount;
      })

    this.tourUnsubscriber = this.ticketsService.ticketType$.subscribe((data:ITourTypeSelect)=>{
      this.ticketType = data;
      this.searchTickets();
    });
  }

  ngOnDestroy() {
    this.tourUnsubscriber.unsubscribe();
    this.searchTicketSub.unsubscribe();
  }

  // handleSearchTickets(ev:Event){
  //   // const text = (ev?.target as HTMLInputElement).value;
  //   // this.searchText = text;
  //   this.searchTickets()
  // }
  searchTickets(): void {

    if (this.ticketType.value=='all') {
      this.ticketsCopy = this.ticketsStorage.getStorage().filter(
        t=>(t.name.toUpperCase().includes(this.searchText.toUpperCase())
          || t.description.toUpperCase().includes(this.searchText.toUpperCase()))
      );
      this.ticketsFilteredCount=this.ticketsCopy.length;
      setTimeout(()=>{
        this.blockDirective.updateItems();
      })
      return;
    }

    this.ticketsCopy = this.ticketsStorage.getStorage().filter(
      t=>(t.name.toUpperCase().includes(this.searchText.toUpperCase())
        || t.description.toUpperCase().includes(this.searchText.toUpperCase()))
        && t.type == this.ticketType.value
    );
    this.ticketsFilteredCount=this.ticketsCopy.length;

    if (this.ticketType.date) {
      const dateWithoutTime = new Date(this.ticketType.date).toISOString().split('T');
      const dateValue = dateWithoutTime[0]
      console.log('dateValue',dateValue)
      this.ticketsCopy = this.tickets.filter((el) => el.date === dateValue);
    }
    setTimeout(() => {

      this.blockDirective.updateItems();

      // this.blockDirective.setAttrStyleBorder(0);  // сбрасываем индекс на 0 элемент
    });
  }


  goToTicketInfoPage(ticket: ITour) {
    // this.router.navigate([`/tickets/ticket/${ticket.id}`]);
    this.router.navigate([`/tickets/ticket`],{queryParams:{id:ticket.id}}).then(r=>console.log(r));
  }

  directiveRenderComplete(ev: boolean) {
    this.blockDirective.initItems();
    this.blockDirective.setAttrStyleBorder(0);
  }
}
