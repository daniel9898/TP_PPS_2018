import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//SERVICIOS
import { AuthServicioProvider } from '../../../providers/auth-servicio/auth-servicio';

@IonicPage()
@Component({
  selector: 'page-supervisor-inicio',
  templateUrl: 'supervisor-inicio.html',
})
export class SupervisorInicioPage {

  user_perfil:any;
  user_photo:any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public _auth: AuthServicioProvider) {

      this.user_perfil = this._auth.get_userProfile();
      this.user_photo = this._auth.get_userPhoto();
      console.log("Usuario actual: " + this.user_perfil);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SupervisorInicioPage');
  }

}
