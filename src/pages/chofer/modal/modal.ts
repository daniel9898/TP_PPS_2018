import { Component } from '@angular/core';
import { IonicPage, NavParams, NavController } from 'ionic-angular';
//PAGINAS
import { ListaViajesPage } from '../lista-viajes/lista-viajes';
//IDIOMA
import { Idioma } from '../../../assets/data/idioma/es';
import { IdiomaProvider } from '../../../providers/idioma/idioma';

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
    public navCtrl:NavController,
    public _idiomaSrv: IdiomaProvider) {
      //IDIOMA
      this.idioma = Idioma.es;
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
    this._idiomaSrv.getLanguageFromStorage()
      .then((idioma)=>{
        this.idioma = idioma;
      })
  }

  dismiss() {
    this.navCtrl.setRoot(ListaViajesPage);
  }

}
