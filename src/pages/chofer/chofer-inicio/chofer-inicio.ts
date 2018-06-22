import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//FIREBASE
import * as firebase from 'firebase/app';
import { UtilidadesProvider } from '../../../providers/utilidades/utilidades';
import { VehiculosProvider } from '../../../providers/vehiculos/vehiculos';

@IonicPage()
@Component({
  selector: 'page-chofer-inicio',
  templateUrl: 'chofer-inicio.html',
})
export class ChoferInicioPage {

  usuarioSesion:any;
  asignado: boolean = false;
  vehiculos: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public utils: UtilidadesProvider,
              public vehiculosProv :VehiculosProvider) {

        this.usuarioSesion = firebase.auth().currentUser;
        console.log("Usuario actual: " + JSON.stringify(this.usuarioSesion));

        this.vehiculosProv.getListaVehiculos().subscribe(
          lista => this.vehiculos = lista,
          error => console.log(error)
        )
  }

    /*
  logeo
  boton - inicio actividad
  asignacion de vehiculo
  encuesta con el qr
  lista de espera

  */

  comenzar(){

    console.log('vehiculos',this.vehiculos);

  }

}
