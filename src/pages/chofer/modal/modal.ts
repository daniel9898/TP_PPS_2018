import { Component } from '@angular/core';
import { IonicPage, NavParams, NavController } from 'ionic-angular';
//PAGINAS
import { ListaViajesPage } from '../lista-viajes/lista-viajes';

@IonicPage()
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {

 viaje :any;
 cliente:any;

  constructor(
    public nav_params: NavParams,
    public navCtrl:NavController) {

      this.viaje = this.nav_params.get('viaje');
      this.cliente = this.nav_params.get('cliente');
      console.log('viaje en modal ',this.viaje);
      console.log('cliente en modal', this.cliente)
  }

  dismiss() {
    this.navCtrl.setRoot(ListaViajesPage);
  }

}
