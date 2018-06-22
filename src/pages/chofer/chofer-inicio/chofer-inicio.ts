import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//FIREBASE
import * as firebase from 'firebase/app';
import { UtilidadesProvider } from '../../../providers/utilidades/utilidades';

@IonicPage()
@Component({
  selector: 'page-chofer-inicio',
  templateUrl: 'chofer-inicio.html',
})
export class ChoferInicioPage {

  usuarioSesion:any;
  asignado: boolean = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public utils: UtilidadesProvider) {

        this.usuarioSesion = firebase.auth().currentUser;
        console.log("Usuario actual: " + JSON.stringify(this.usuarioSesion));
  }

    /*
  logeo
  boton - inicio actividad
  asignacion de vehiculo
  encuesta con el qr
  lista de espera

  */

  comenzar(){

  }

}
