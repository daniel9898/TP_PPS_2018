import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { SupervisorListaViajesPage } from '../supervisor-lista-viajes/supervisor-lista-viajes';
import { SupervisorListaReservasPage } from '../supervisor-lista-reservas/supervisor-lista-reservas';

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
  reservas: any;

  constructor() {
    this.viajes = SupervisorListaViajesPage;
    this.reservas = SupervisorListaReservasPage;
  }
}
