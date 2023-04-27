import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings/settings.component';
import {TabMenuModule} from "primeng/tabmenu";
import {TabPanel, TabView, TabViewModule} from "primeng/tabview";
import {FormsModule} from "@angular/forms";
import {ToastModule} from "primeng/toast";
import {MessageService} from "primeng/api";
import { StatisticComponent } from './settings/statistic/statistic.component';
import {TableModule} from "primeng/table";


@NgModule({
  declarations: [
    SettingsComponent,
    StatisticComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    TabViewModule,
    FormsModule,
    ToastModule,
    TableModule

  ],
  providers:[
    MessageService
  ]

})
export class SettingsModule { }


