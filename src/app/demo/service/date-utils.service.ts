import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateUtilsService {

  constructor() { }

  static addOneDay(input: Date, days: number) {
    var date = new Date(input);
    date.setDate(date.getDate() + days);
    return date
  }
}
