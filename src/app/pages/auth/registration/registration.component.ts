import { Component, OnInit } from '@angular/core';
import {MessageService} from "primeng/api";
import {IUser} from "../../../models/IUser";
import {AuthService} from "../../../services/auth/auth.service";
import {ConfigService} from "../../../services/config/config.service";
import {UserService} from "../../../services/user/user.service";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  login: string;
  psw: string;
  pswRepeat: string;
  email: string;
  cardNumber: string;
  isNeedSaveToLocalStorage: false;
  showCardNumber: boolean;

  constructor(private messageService:MessageService,
    private authService:AuthService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.showCardNumber = ConfigService.config.useUserCard;
  }




  registration(event: MouseEvent): void | boolean {
    if(this.psw!=this.pswRepeat){
        this.messageService.add({
            severity:'error',
            summary:'Ошибка валидации',
            detail:'Некорректно подтвержден пароль'
          });
        return false;
    }
    const userObject:IUser = {
      login:this.login,
      psw:this.psw,
      cardNumber:this.cardNumber,
      email:this.email,
    }
    const isReg = this.authService.setUser(userObject);
    if (isReg.status) {

      this.messageService.add({
        severity: 'success',
        summary: `Пользователь ${userObject.login} успешно зарегистрирован`,
      });

      if (this.isNeedSaveToLocalStorage){
        this.authService.saveUserToLocalStorage(userObject);
        this.messageService.add({
          severity: 'success',
          summary: `Пользователь ${userObject.login} успешно сохранен в хранилище`,
        });
      }
      return true;
    } else {
      this.messageService.add({
        severity:'warn',
        summary:`Ошибка регистрации (${isReg.message})`,
      });
      return false;
    }

  }

  removeUsersFromLocalStorage($event: MouseEvent) {
    this.userService.removeUsersFromLocalStorage();
  }
}
