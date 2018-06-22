import { Injectable } from '@angular/core';
import * as moment from 'moment';

/*
  Generated class for the DateTimeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DateTimeProvider {

  constructor() {
    console.log('Hello DateTimeProvider Provider');
    moment.locale('es');
  }

  /**
   * Retorna un array con los días de la semana
   */
  getWeekDays(): string[] {
    return moment.weekdays();
  }

  /**
   * Retorna un array con los nombres de los días de la semana cortos
   */
  getWeekDaysShort(): string[]{
    return moment.weekdaysShort();
  }

  /**
   * Retorna un array con los meses
   */
  getMonthNames(): string[] {
    return moment.months();
  }

  /**
   * Retorna un array con los nombres cortos de los meses
   */
  getMonthNamesShort(){
    return moment.monthsShort();
  }
}
