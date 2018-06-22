import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { DateTimeProvider } from '../../../providers/date-time/date-time';

@IonicPage()
@Component({
  selector: 'page-cliente-reserva',
  templateUrl: 'cliente-reserva.html',
})
export class ClienteReservaPage {


  public fecha: Date;
  public hora: Date;
  monthNames: string[];
  monthShortNames: string[];
  daysNames: string[];
  daysShortNames: string[];

  constructor(dateTimeSrv: DateTimeProvider) {
    this.hora = new Date();
    this.hora = new Date(this.hora.toLocaleTimeString());
    this.monthNames = dateTimeSrv.getMonthNames();
    this.daysNames = dateTimeSrv.getWeekDays();
    this.daysShortNames = dateTimeSrv.getWeekDaysShort();
    this.monthShortNames = dateTimeSrv.getMonthNamesShort();
  }



}
