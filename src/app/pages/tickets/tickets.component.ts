import {AfterViewInit, Component, ElementRef, OnInit, Output, ViewChild} from '@angular/core';
import {IMenuType} from "../../models/IMenuType";

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit, AfterViewInit {

  @Output() public selectedType: IMenuType;
  @ViewChild('root') root: ElementRef;
  constructor( ) { }

  ngOnInit(): void {



  }
  ngAfterViewInit(): void {
  }
  public updateSelectedType(ev: IMenuType): void {
    this.selectedType = ev;
  }

}
