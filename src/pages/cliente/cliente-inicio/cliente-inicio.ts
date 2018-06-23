import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
//SERVICIOS
import { AuthServicioProvider } from '../../../providers/auth-servicio/auth-servicio';
//PAGINAS
import { ClienteViajePage } from '../../index-paginas';

@Component({
  selector: 'page-cliente-inicio',
  templateUrl: 'cliente-inicio.html',
})
export class ClienteInicioPage {

  usuarioSesion:any;
  show_arrow:boolean;
  foto_viaje:string = "assets/imgs/auto_viaje_off.png";

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public _authServicio:AuthServicioProvider) {

        this.usuarioSesion = this._authServicio.get_userData();
        this.show_arrow = true;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClienteInicioPage');
  }

  pedir_viaje(){
      this.navCtrl.push(ClienteViajePage);
  }

}
