import {Component, OnInit, Output} from '@angular/core';
import {IMenuType} from "../../models/IMenuType";

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit {
  @Output() public selectedType: IMenuType;
  constructor() { }

  ngOnInit(): void {
  }

  public updateSelectedType(ev: IMenuType): void {
    this.selectedType = ev;
  }

}
