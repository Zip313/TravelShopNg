import { Component, OnInit } from '@angular/core';
import {MenuItem, MessageService} from "primeng/api";
import {AuthService} from "../../../services/auth/auth.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  oldPassword:string;
  newPassword:string;
  confirmPassword:string;
  isTouched:boolean = false;
  constructor(private authService:AuthService,
              private messageService:MessageService,) { }

  ngOnInit(): void {

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
