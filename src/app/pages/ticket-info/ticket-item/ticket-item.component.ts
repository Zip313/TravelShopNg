import {AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {INearestTour, ITour, ITourLocation} from "../../../models/ITour";
import {ActivatedRoute} from "@angular/router";
import {IUser} from "../../../models/IUser";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../services/user/user.service";
import {TicketsService} from "../../../services/tickets/tickets.service";
import { debounceTime, forkJoin, fromEvent, map, Subscription} from "rxjs";
import {PopupComponent} from "./popup/popup.component";

@Component({
  selector: 'app-ticket-item',
  templateUrl: './ticket-item.component.html',
  styleUrls: ['./ticket-item.component.scss']
})
export class TicketItemComponent implements OnInit,AfterViewInit,OnDestroy {

  ticket?: ITour;
  user: IUser | null;
  userForm: FormGroup;
  nearestTours?: INearestTour[];
  toursLocation?: ITourLocation[];
  searchText: any;
  @ViewChild('ticketSearchInput') ticketSearchInput: ElementRef;
  @ViewChild('popup') popup: PopupComponent;

  @Output() onClick:EventEmitter<string> = new EventEmitter<string>();

  ticketRestSub: Subscription;
  searchTicketSub: Subscription;
  private searchTypes = [1, 2, 3];

  constructor(private route: ActivatedRoute,
              // private ticketStorage:TicketsStorageService,
              private ticketsService: TicketsService,
              private userService: UserService) {
  }

  ngOnInit(): void {

    // first get userInfo
    this.user = this.userService.getUser();

    // init FormGroup
    this.userForm = new FormGroup({
      firstName: new FormControl('', {validators: Validators.required}),
      lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
      cardNumber: new FormControl(), //this.user?.cardNumber
      birthDay: new FormControl(),
      age: new FormControl(),
      citizen: new FormControl(),
    });


    const routeIdParam = this.route.snapshot.paramMap.get('id');
    const queryIdParam = this.route.snapshot.queryParamMap.get('id');

    const paramValueId = routeIdParam || queryIdParam;
    if (paramValueId) {
      // this.ticketsService.getTicketById(paramValueId)
      //   .subscribe((data) => {
      //     this.ticket = data;
      //   });
      // forkJoin([this.ticketsService.getNearestTickets(), this.ticketsService.getTicketsLocation()])
      //   .pipe(map(data => {
      //     data[0].forEach(n => {
      //       n.location = data[1].find(l => n.locationId == l.id)
      //     });
      //     return [<INearestTour[]>data[0], <ITourLocation[]>data[1]];
      //   }))
      //   .subscribe(data => {
      //     this.nearestTours = <INearestTour[]>data[0];
      //     this.toursLocation = <ITourLocation[]>data[1];
      //   })
      this.initTicketInfo(paramValueId);

    }
  }

  ngAfterViewInit(): void {


    const fromEventObserver = fromEvent(this.ticketSearchInput.nativeElement, 'keyup', {passive: true});
    this.searchTicketSub = fromEventObserver
      .subscribe(() => {
        this.initSearchNearerTour(this.searchText);
        this.popup.onChange(this.searchText);
      })

    // setCardNumber
    this.userForm.controls['cardNumber'].setValue(this.user?.cardNumber);

    // this.userForm.patchValue({
    //   cardNumber: this.user?.cardNumber
    // });
  }

  ngOnDestroy(): void {
    if (this.searchTicketSub) this.searchTicketSub.unsubscribe();
  }

  initTicketInfo(id:string){
    this.ticketsService.getTicketInfoById(id)
      .subscribe(data=>{
        const [rTicket,rNearestTours,rToursLocation] = data;
        this.ticket = rTicket;
        this.nearestTours = rNearestTours;
        this.toursLocation = rToursLocation;
      })
  }

  initSearchNearerTour(searchText:string) {
    if (!searchText && this.ticket?.id) {
      this.initTicketInfo(this.ticket?.id);
      return;
    }
    const type = Math.floor(Math.random() * this.searchTypes.length);

    if (this.ticketRestSub && !this.searchTicketSub.closed) {
      this.ticketRestSub.unsubscribe();
    }
    this.ticketRestSub = this.ticketsService.getRandomNearestEvent(type)
      .subscribe((data) => {
        if (this.toursLocation) {
          this.nearestTours = this.ticketsService.getNearestToursWithLocation([data], this.toursLocation);
        }
      })
  }

  onSubmit(): void {
    console.log(this.userForm)
  }

  onSelectDate(event: any) {
    console.log(event.toLocaleString())
  }


  initTour(): void {
    const userData = this.userForm.getRawValue();
    const postData = {...this.ticket, ...userData};
    this.ticketsService.sendTour(postData).subscribe( r=>{
      console.log('response init tour',r);
    });
  }


  checkNearest(text: any) {
    this.searchText = text;
  }

  search(txt: any) {
    console.log('search: ', txt);
    this.searchText=txt;
  }
}
