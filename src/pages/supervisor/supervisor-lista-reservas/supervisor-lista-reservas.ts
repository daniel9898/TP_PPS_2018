import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ReservasProvider } from '../../../providers/reservas/reservas';
import { SupervisorChoferesDisponiblesPage } from '../supervisor-choferes-disponibles/supervisor-choferes-disponibles';

/**
 * Generated class for the SupervisorListaReservasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-supervisor-lista-reservas',
  templateUrl: 'supervisor-lista-reservas.html',
})
export class SupervisorListaReservasPage {
  reservas: any[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private reservasSrv: ReservasProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SupervisorListaReservasPage');
    this.reservasSrv.getListaReservas().subscribe(next => {
      this.reservas = next.filter(reserva => reserva.reserva.estado === 'pendiente');
      console.log(next);
    });
  }

  /**
 * push a la lista de choferes
 * @param index indice del array de viajes
 */
  verChoferes(index) {
    const viaje = this.reservas[index];
    this.navCtrl.push(SupervisorChoferesDisponiblesPage, { viaje: viaje, esReserva: true });
  }


  /**
   * Cancela la reserva
   * @param index indice del viaje selecionado
   */
  cancelarReserva(index) {
    const item = this.reservas[index]
    item.reserva.estado = 'cancelado';
    this.reservasSrv.updateItem(item.key, item.reserva);
  }

}
