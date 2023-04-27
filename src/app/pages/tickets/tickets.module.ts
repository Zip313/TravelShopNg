import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketsRoutingModule } from './tickets-routing.module';
import { TicketsComponent } from './tickets.component';
import {AsideComponent} from "./aside/aside.component";
import {HeaderComponent} from "./header/header.component";
import {FooterComponent} from "./footer/footer.component";
import {TicketListComponent} from "./ticket-list/ticket-list.component";
import {MenubarModule} from 'primeng/menubar';
import {TicketsService} from "../../services/tickets/tickets.service";
import { UserLogoComponent } from './header/user-logo/user-logo.component';
import {DropdownModule} from "primeng/dropdown";
import {FormsModule} from "@angular/forms";
import {BlocksStyleDirective} from "../../directive/blocks-style.directive";
import {CalendarModule} from "primeng/calendar";
import {MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";
import { TicketListItemComponent } from './ticket-list/ticket-list-item/ticket-list-item.component';
import {InputTextModule} from "primeng/inputtext";

@NgModule({
  declarations: [
    TicketsComponent,
    AsideComponent,
    HeaderComponent,
    FooterComponent,
    TicketListComponent,
    UserLogoComponent,
    BlocksStyleDirective,
    TicketListItemComponent
  ],
  imports: [
    CommonModule,
    TicketsRoutingModule,
    MenubarModule,
    DropdownModule,
    FormsModule,
    CalendarModule,
    ToastModule,
    InputTextModule

  ],
  providers:[
    TicketsService,
    MessageService
  ],
    exports: [
        TicketListItemComponent

    ]
})
export class TicketsModule { }
