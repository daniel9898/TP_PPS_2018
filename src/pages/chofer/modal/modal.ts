import { Component } from '@angular/core';
import { IonicPage, NavParams, NavController } from 'ionic-angular';
//PAGINAS
import { ListaViajesPage } from '../lista-viajes/lista-viajes';
//IDIOMA
import { Idioma } from '../../../assets/data/idioma/es';

@IonicPage()
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {

 viaje :any;
 cliente:any;
 //TEXTO
 idioma:any;

  constructor(
    public nav_params: NavParams,
    public navCtrl:NavController) {
      //IDIOMA
      this.cargar_idioma();
      this.viaje = this.nav_params.get('viaje');
      this.cliente = this.nav_params.get('cliente');
      console.log('viaje en modal ',this.viaje);
      console.log('cliente en modal', this.cliente)
  }
  
  //CARGAR IDIOMA CADA VEZ QUE SE INGRESA
  ionViewWillEnter(){
    this.cargar_idioma();
  }
  //CARGAR IDIOMA
  cargar_idioma(){
    this.idioma = Idioma.es;
  }

  dismiss() {
    this.navCtrl.setRoot(ListaViajesPage);
  }

}
