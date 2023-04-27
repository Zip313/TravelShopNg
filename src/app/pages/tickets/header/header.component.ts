import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {MenuItem} from "primeng/api";
import {IUser} from "../../../models/IUser";
import {UserService} from "../../../services/user/user.service";
import {IMenuType} from "../../../models/IMenuType";
import {AuthService} from "../../../services/auth/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnChanges, OnDestroy {
  items: MenuItem[];
  time: Date;
  user:IUser|null;
  @Input() menuType: IMenuType;
  private timerInterval: number;

  private settingsActive = false;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    // this.user = this.userService.getUser();
    this.items =
      [
      {
        label: 'Билеты',
        routerLink:['tickets-list']
      },
      {
        label: 'Выйти',
        routerLink:['/auth']
      }
    ];

    this.timerInterval = window.setInterval(()=>{
      this.time = new Date();
    },1000)
  }
  ngOnChanges(ev: SimpleChanges): void {
    this.settingsActive = this.menuType?.type === "extended";
    this.items = this.initMenuItems();
  }
  ngOnDestroy() {
    if (this.timerInterval) {
      window.clearInterval(this.timerInterval);
    }
  }


  initMenuItems(): MenuItem[] {
    return [
      {
        label: 'Билеты',
        routerLink:['tickets-list']
      },
      {
        label: 'Настройки',
        routerLink:['/tickets/settings'],
        visible: this.settingsActive
      },
      {
        label: 'Выйти',
        routerLink:['/auth'],
        command:() => {
          this.authService.logout();
        }
      },

    ];
  }

}
