import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DateTimeProvider } from '../../../providers/date-time/date-time';
import { MapaPage } from '../../index-paginas';

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
  public direccionDest: string = '';
  public direccionOrigin: string = '';
  myOriginCallbackFunction: Function;
  myDestCallbackFunction: Function;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    dateTimeSrv: DateTimeProvider) {
    this.hora = new Date();
    this.hora = new Date(this.hora.toLocaleTimeString());
    this.monthNames = dateTimeSrv.getMonthNames();
    this.daysNames = dateTimeSrv.getWeekDays();
    this.daysShortNames = dateTimeSrv.getWeekDaysShort();
    this.monthShortNames = dateTimeSrv.getMonthNamesShort();
  }

  ionViewDidLoad() {
    this.myOriginCallbackFunction = (_params) => {
      console.log("callback asignado");
      return new Promise((resolve, reject) => {
        this.direccionOrigin = _params;
        resolve();
      });
    }
    this.myDestCallbackFunction = (_params) => {
      console.log("callback asignado");
      return new Promise((resolve, reject) => {
        this.direccionDest = _params;
        resolve();
      });
    }
  }


  public setDir(dir) {
    this.direccionOrigin = dir;
  }

  /**
   * Setea la dirección de origen
   */
  setOriginDir() {
    this.navCtrl.push(MapaPage, { 'direccion': this.direccionOrigin, 'callback': this.myOriginCallbackFunction });
  }

  /**
   * Setea la dirección de destino
   */
  setDestDir() {
    this.navCtrl.push(MapaPage, { 'direccion': this.direccionDest, 'callback': this.myDestCallbackFunction });
  }

}
