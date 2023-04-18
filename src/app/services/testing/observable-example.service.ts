import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ObservableExampleService {
  private myBehaviorSubject = new BehaviorSubject<string>('some string data of Behavior');
  private mySubject = new Subject<string>();
  private myObservable = new Observable<string>((subscriber => {
    setTimeout(()=>{
      subscriber.next('some string data of Observable')
    },3000);
  }))
  constructor() { }

  initObservable():void{
    const observable = new Observable((subscriber => {
      subscriber.next(4);
      subscriber.next(5);
      setTimeout(()=>{
        subscriber.next('asyncData');
        subscriber.error('text error observable');
      })
    }));

    observable.subscribe(
      (data)=>{
        console.log('observable data',data);
    },
      error => {
        console.log(error)},
      () => {
        console.log('complete')}
      );
  }

  getObservable(): Observable<string> {
    return this.myObservable;
  }
  getSubject(): Subject<string> {
    return this.mySubject;
  }
  getBehavior(): BehaviorSubject<string> {
    return this.myBehaviorSubject;
  }
}
