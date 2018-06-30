import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { SupervisorListaViajesPage } from '../supervisor-lista-viajes/supervisor-lista-viajes';

/**
 * Generated class for the SupervisorViajesReservasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-supervisor-viajes-reservas',
  templateUrl: 'supervisor-viajes-reservas.html',
})
export class SupervisorViajesReservasPage {

  viajes: any;
  tab2: any;

  constructor() {
    this.viajes = SupervisorListaViajesPage;
    // this.tab2 = Tab2;
  }
}
