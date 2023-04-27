import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {ISettings} from "../../models/ISettings";
import {ITour} from "../../models/ITour";
import {IStatisticUser} from "../../models/IStatistic";
import {StatisticRestService} from "../rest/statistic-rest.service";

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private settingsSubject: Subject<ISettings> = new Subject<ISettings>();

  constructor(
    private statisticRestService: StatisticRestService,
  ) { }

  loadUserSettings(): Observable<ISettings> {
    const settingsObservable = new Observable<ISettings>((subscriber)=>{
      const settingsData: ISettings = {
        saveToken:true
      };
      subscriber.next(settingsData);
    });
    return settingsObservable;
  }

  loadUserSettingsSubject(data: ISettings): any {
    this.settingsSubject.next(data);
  }

  getSettingsSubjectObservable(): Observable<ISettings> {
    return this.settingsSubject.asObservable();
  }

  getStatisticUser(): Observable<IStatisticUser[]> {
    return this.statisticRestService.getStatisticUser();
  }
}
