import { Injectable } from '@angular/core';
import {IUser} from "../../models/IUser";
import {AuthService} from "../auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user:IUser|null;
  private token:string|null=null;
  get Token():string|null {
    if(!this.token) this.token=window.localStorage.getItem('userToken');
    return this.token;
  }
  set Token(value){
    this.token = value;
    if (value)
      window.localStorage.setItem('userToken',value)
    else
      window.localStorage.removeItem('userToken')

  }
  constructor() { }

  getUser():IUser|null{
    return this.user;
  }

  setUser(userData:IUser|null):void{
    this.user=userData;
  }

  removeUserFromStorage() {
    window.localStorage.removeItem('user');
  }

  removeUsersFromLocalStorage(): void {
    window.localStorage.removeItem('users');
  }

  rememberUser() {
    window.localStorage.setItem('user',JSON.stringify(this.getUser()));
  }


}
