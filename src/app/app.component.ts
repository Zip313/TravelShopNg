import {Component, OnInit} from '@angular/core';
import {AuthService} from "./services/auth/auth.service";
import {ObservableExampleService} from "./services/testing/observable-example.service";
import {ConfigService} from "./services/config/config.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'ticketSales2022';
  constructor(private authService:AuthService,
              private observableService: ObservableExampleService,
              private config:ConfigService
  ) { }

  ngOnInit(): void {
    //this.config.configLoad();

    // this.observableService.initObservable();
    const myObservable = this.observableService.getObservable();
    // myObservable.subscribe((data)=>{
    //   console.log('first o',data);
    // });
    //
    // myObservable.subscribe((data)=>{
    //   console.log('second o',data);
    // })

    const mySubject = this.observableService.getSubject();
    // mySubject.subscribe((data)=>{
    //   console.log('first Subject',data)
    // })
    // mySubject.subscribe((data)=>{
    //   console.log('second Subject',data)
    // })
    mySubject.next('subject val1')
    mySubject.next('subject val2')


    const myBehavior = this.observableService.getBehavior();
    // myBehavior.subscribe((data)=>{
    //   console.log('first BehaviorSubject',data)
    // })
    // myBehavior.subscribe((data)=>{
    //   console.log('second BehaviorSubject',data)
    // })

    myBehavior.next('behavior val1');
    myBehavior.next('behavior val2');
  }
}
