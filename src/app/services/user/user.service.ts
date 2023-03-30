import { Injectable } from '@angular/core';
import {IUser} from "../../models/IUser";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user:IUser|null;
  constructor() { }

  getUser():IUser|null{
    return this.user;
  }

  setUser(userData:IUser|null):void{
    this.user=userData;
  }
}
