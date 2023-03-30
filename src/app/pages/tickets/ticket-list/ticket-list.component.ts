import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {TicketsService} from "../../../services/tickets/tickets.service";
import {ITour} from "../../../models/ITour";
import {TicketsStorageService} from "../../../services/tickets-storage/tickets-storage.service";
import {Router} from "@angular/router";
import {BlocksStyleDirective} from "../../../directive/blocks-style.directive";

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss'],
})
export class TicketListComponent implements OnInit, AfterViewInit {
  tickets:ITour[]=[];
  @ViewChild('tourWrap',{read: BlocksStyleDirective}) blockDirective:BlocksStyleDirective;
  @ViewChild('tourWrap') tourWrap:ElementRef;

  ticketsFiltered:ITour[]=[];
  ticketsCount:number=0;
  ticketsFilteredCount:number=0;


  constructor(private ticketsService:TicketsService,
              private ticketsStorage:TicketsStorageService,
              private router:Router) { }

  ngAfterViewInit(): void {
    console.log(this.tourWrap.nativeElement.querySelectorAll('.ticket-item'))
    console.log(this.blockDirective)

    }

  ngOnInit(): void {
    this.ticketsService.getTickets()
      .subscribe(
        (data)=>{
          this.tickets=data;
          this.ticketsStorage.setStorage(data);
          this.ticketsFiltered = [...data];
          this.ticketsCount=this.tickets.length;
          this.ticketsFilteredCount=this.ticketsCount;

      })
  }

  searchTickets(ev:Event): void {
    const text = (ev?.target as HTMLInputElement).value;

    if (text == '' || text==undefined) {
      this.ticketsFiltered= [...this.ticketsStorage.getStorage()];
      this.ticketsFilteredCount=this.ticketsFiltered.length;
      return;
    }

    this.ticketsFiltered= this.ticketsStorage.getStorage().filter(
      t=>t.name.toUpperCase().includes(text.toUpperCase())
        || t.description.toUpperCase().includes(text.toUpperCase())
    );
    this.ticketsFilteredCount=this.ticketsFiltered.length;
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
