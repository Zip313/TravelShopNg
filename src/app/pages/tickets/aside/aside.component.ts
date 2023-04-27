import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IMenuType} from "../../../models/IMenuType";
import {ITourTypeSelect} from "../../../models/ITour";
import {TicketsService} from "../../../services/tickets/tickets.service";
import {MessageService} from "primeng/api";
import {SettingsService} from "../../../services/settings/settings.service";

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})
export class AsideComponent implements OnInit {
  public menuTypes: IMenuType[];
  public selectedMenuType: IMenuType;
  @Output() updateMenuType: EventEmitter<IMenuType> = new EventEmitter();

  tourTypes: ITourTypeSelect[] = [
    {label: 'Все', value: 'all'},
    {label: 'Одиночный', value: 'single'},
    {label: 'Групповой', value: 'multi'}
  ]

  constructor(private ticketsService: TicketsService,
              private settingsService: SettingsService,
              private messageService:MessageService
  ) { }

  ngOnInit(): void {
    this.menuTypes = [
      {type: 'custom', label : 'Обычное'},
      {type: 'extended', label : 'Расширенное'}
    ]
  }

  changeType(ev: {ev: Event, value: IMenuType}): void {
    this.updateMenuType.emit(ev.value);
  }
  changeTourType(ev:  {ev: Event, value: ITourTypeSelect}): void {
    this.ticketsService.updateTour(ev.value)
  }

  selectDate(ev: string) {
    console.log('ev',ev);
    this.ticketsService.updateTour({date:ev})
  }

  initRestError():void {
    this.ticketsService.getError().subscribe({
      next:(data)=>{
        console.log(data);
      },
      error:(error)=> {
        console.log(error);
        this.messageService.add({
          severity: 'error',
          life: 3000,
          summary: `Ошибка регистрации (${error.message})`,
        })
      },
      complete: () => {}
    });
  }

  initSettingsData(): void {
    this.settingsService.loadUserSettingsSubject({
      saveToken:false
    });
  }
}
