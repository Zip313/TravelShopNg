import { Component, OnInit } from '@angular/core';
import {IUser} from "../../../../models/IUser";
import {UserService} from "../../../../services/user/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-logo',
  templateUrl: './user-logo.component.html',
  styleUrls: ['./user-logo.component.scss']
})
export class UserLogoComponent implements OnInit {
  public user:IUser|null;
  constructor(private userService:UserService, private router:Router) { }

  ngOnInit(): void {
    this.user=this.userService.getUser();
  }

  handleClick():void{
    this.router.navigate(['/auth']);
  }

}
