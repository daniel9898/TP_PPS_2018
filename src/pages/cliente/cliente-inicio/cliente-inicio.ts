import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//SERVICIOS
import { AuthServicioProvider } from '../../../providers/auth-servicio/auth-servicio';

@IonicPage()
@Component({
  selector: 'page-cliente-inicio',
  templateUrl: 'cliente-inicio.html',
})
export class ClienteInicioPage {

  usuarioSesion:any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public _authServicio:AuthServicioProvider) {

        this.usuarioSesion = this._authServicio.get_userData();
        //console.log("Usuario actual: " + JSON.stringify(this.usuarioSesion));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClienteInicioPage');
  }

}
