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
  vehiculoAsignado : any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public utils: UtilidadesProvider,
              public vehiculosProv :VehiculosProvider) {
        
    this.usuarioSesion = firebase.auth().currentUser;

    this.vehiculosProv.getListaVehiculos().subscribe(
      lista => this.vehiculos = lista,
      error => this.utils.showAlert('Atención !',error.json())
    )
  }

  comenzarActividad(){
    this.utils.showLoading();
    console.log('vehiculos',this.vehiculos);
    
    for(let i=0; i<this.vehiculos.length; i++){
        if(this.vehiculos[i].vehiculo.activo && !this.vehiculos[i].vehiculo.ocupado){
           this.vehiculoAsignado = this.vehiculos[i];
           this.asignado = true;
           break;
        }
    }

    //FALTA GUARDAR EL VEHICULO ASIGNADO

    if(!this.asignado) { this.utils.showAlert('Atención !','Por el momento no hay vehiculos disponibles reintente más tarde.') }

    this.utils.dismissLoading();
  }

}
