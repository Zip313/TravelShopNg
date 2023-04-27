import { Component, OnInit } from '@angular/core';
import {IStatisticUser} from "../../../../models/IStatistic";
import {SettingsService} from "../../../../services/settings/settings.service";

@Component({
  selector: 'app-statistic',
  template: `
    <div class="wrapper">
      <p-table [value]="statistics" [tableStyle]="{ 'min-width': '50rem' }">
        <ng-template pTemplate="header">
          <tr>
            <th *ngFor="let header of headers">{{header}}</th>
          </tr>
        </ng-template>
        <ng-template pTemplate="body" let-statistic>
          <tr>
            <td>{{ statistic.name }}</td>
            <td>{{ statistic.username }}</td>
            <td>{{ statistic.address.city }}</td>
            <td>{{ statistic.website }}</td>
            <td>{{ statistic.company.name }}</td>
          </tr>
        </ng-template>
      </p-table>
    </div>
  `,
  styles: [`
    .wrapper{
      height: 100%;
      width: 100%;
      overflow: auto;
    }
    `
  ]
})
export class StatisticComponent implements OnInit {
  headers = [ 'Name','Username','City','Website','Company' ]
  statistics: IStatisticUser[] = [];
  constructor(
    private settingsService: SettingsService,
  ) { }

  ngOnInit(): void {
    this.settingsService.getStatisticUser()
      .subscribe((data)=>{
        this.statistics = data;
      })
  }

}
