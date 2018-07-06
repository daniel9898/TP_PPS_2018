import { Component } from '@angular/core';
import { IonicPage, NavParams, NavController, ViewController } from 'ionic-angular';
//PAGINAS
import { ChoferInicioPage } from '../../../pages/index-paginas';

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
    public navCtrl:NavController,
    public viewCtrl: ViewController) {

      this.viaje = this.nav_params.get('viaje');
      this.cliente = this.nav_params.get('cliente');
      console.log('viaje en modal ',this.viaje);
      console.log('cliente en modal', this.cliente)
  }



  dismiss() {
    this.viewCtrl.dismiss();
    this.navCtrl.setRoot(ChoferInicioPage);
  }

}
