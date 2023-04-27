import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IStatisticUser} from "../../models/IStatistic";

@Injectable({
  providedIn: 'root'
})
export class StatisticRestService {

  constructor(private http: HttpClient) { }


  getStatisticUser():Observable<IStatisticUser[]>{
    return this.http.get<IStatisticUser[]>(`https://jsonplaceholder.typicode.com/users`)
  }
}
