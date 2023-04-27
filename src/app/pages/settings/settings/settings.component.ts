import {Component, OnDestroy, OnInit} from '@angular/core';
import {MenuItem, MessageService} from "primeng/api";
import {AuthService} from "../../../services/auth/auth.service";
import {ObservableExampleService} from "../../../services/testing/observable-example.service";
import {Subject, Subscription, take, takeUntil} from "rxjs";
import {SettingsService} from "../../../services/settings/settings.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {
  oldPassword:string;
  newPassword:string;
  confirmPassword:string;
  isTouched:boolean = false;
  // settingsData: Subscription;
  // settingsDataSubject: Subscription;
  subjectForSubscribe = new Subject();

  constructor(private authService:AuthService,
              private messageService:MessageService,
              private settingsService: SettingsService,
              ) { }

  ngOnInit(): void {
    // this.settingsData = this.settingsService.loadUserSettings()
    //   .pipe(take(1))
    //   .subscribe((data)=>{
    //     console.log('settingsData',data);
    // })
    // this.settingsDataSubject = this.settingsService.getSettingsSubjectObservable()
    //   .pipe(take(1))
    //   .subscribe(
    //     (data)=>{
    //       console.log('settingsDataSubject',data);
    //     })
    this.settingsService.loadUserSettings()
      .pipe(takeUntil(this.subjectForSubscribe))
      .subscribe((data)=>{
        console.log('settingsDataObservable',data);
    });
    this.settingsService.getSettingsSubjectObservable()
      .pipe(takeUntil(this.subjectForSubscribe))
      .subscribe(
        (data)=>{
          console.log('settingsDataSubject',data);
        });
  }

  ngOnDestroy(): void {
    // this.settingsData.unsubscribe();
    // this.settingsDataSubject.unsubscribe();
    this.subjectForSubscribe.next(true);
    this.subjectForSubscribe.complete();
  }



  changePassword(){
    this.isTouched=true;
    if (this.confirmPassword!=this.newPassword) return;
    const res =this.authService.changePassword(this.oldPassword,this.newPassword);
    if(res){
      this.messageService.add({
        severity: 'success',
        summary: `Пароль успешно изменен`,
      });
      this.isTouched=false;
      this.oldPassword='';
      this.newPassword='';
      this.confirmPassword='';
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Пароль не удалось изменить',
      });
    }

  }


}
