import { Injectable } from '@angular/core';
import {ITour} from "../../models/ITour";

@Injectable({
  providedIn: 'root'
})
export class TicketsStorageService {
  private ticketStorage:ITour[]

  constructor() { }

  setStorage(data:ITour[]): void {
    this.ticketStorage = data;
  }

  getStorage(): ITour[] {
    return this.ticketStorage;
  }
}
